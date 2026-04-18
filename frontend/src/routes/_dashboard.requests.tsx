import { createFileRoute } from "@tanstack/react-router";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { Check, X, MessageSquare, Search } from "lucide-react";
import { getRequests, type Request } from "@/api/dashboardApi";
import { SectionShell } from "@/components/dashboard/SectionShell";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/_dashboard/requests")({
  component: RequestsPage,
});

function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);
  const deferredSearch = useDeferredValue(search);

  const updateStatus = (id: string, status: "Approved" | "Denied") => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const filtered = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();
    if (!query) return requests;

    return requests.filter(
      (request) =>
        request.employeeName.toLowerCase().includes(query) ||
        request.type.toLowerCase().includes(query) ||
        request.message.toLowerCase().includes(query)
    );
  }, [requests, deferredSearch]);

  const totalPages = useMemo(() => Math.max(Math.ceil(filtered.length / perPage), 1), [filtered.length, perPage]);
  const paginatedRequests = useMemo(
    () => filtered.slice((page - 1) * perPage, page * perPage),
    [filtered, page, perPage]
  );
  const startItem = filtered.length === 0 ? 0 : (page - 1) * perPage + 1;
  const endItem = filtered.length === 0 ? 0 : Math.min(page * perPage, filtered.length);

  useEffect(() => {
    getRequests().then(setRequests).catch((error) => {
      console.error("Failed to load requests", error);
    });
  }, []);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <SectionShell
        title="Requests & Notifications"
        icon={<MessageSquare className="h-5 w-5 text-primary" />}
        className="animate-fade-in-up"
        actions={
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        }
      >
      <Card className="flex min-h-0 flex-1 flex-col">
        <CardContent className="flex min-h-0 flex-1 flex-col gap-3 pt-4">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] font-semibold text-slate-700">Employee Name</TableHead>
                <TableHead className="w-[190px] font-semibold text-slate-700">Request Type</TableHead>
                <TableHead className="hidden font-semibold text-slate-700 md:table-cell">Message</TableHead>
                <TableHead className="w-[120px] font-semibold text-slate-700">Status</TableHead>
                <TableHead className="w-[120px] font-semibold text-slate-700">Date</TableHead>
                <TableHead className="w-[260px] font-semibold text-slate-700">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="py-2.5 font-medium align-top">{request.employeeName}</TableCell>
                  <TableCell className="py-2.5 text-muted-foreground align-top">{request.type}</TableCell>
                  <TableCell className="hidden md:table-cell py-2.5 text-muted-foreground align-top">
                    <p className="line-clamp-2 leading-snug">{request.message}</p>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={request.status} />
                  </TableCell>
                  <TableCell className="py-2.5 text-muted-foreground align-top">{request.date}</TableCell>
                  <TableCell className="py-2.5 align-top">
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2 text-xs gap-1 text-primary border-primary/30 hover:bg-primary/5"
                        onClick={() => updateStatus(request.id, "Approved")}
                      >
                        <Check className="h-3 w-3" />Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2 text-xs gap-1 text-destructive border-destructive/20 hover:bg-destructive/5"
                        onClick={() => updateStatus(request.id, "Denied")}
                      >
                        <X className="h-3 w-3" />Deny
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1">
                        <MessageSquare className="h-3 w-3" />Reply
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
            <span>
              Showing {startItem}-{endItem} of {filtered.length} requests
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                &lt;
              </Button>
              {Array.from({ length: Math.min(totalPages, 3) }, (_, index) => index + 1).map((pageNumber) => (
                <Button
                  key={pageNumber}
                  variant={pageNumber === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPage(pageNumber)}
                  className="w-8"
                >
                  {pageNumber}
                </Button>
              ))}
              {totalPages > 3 && <span>...</span>}
              <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                &gt;
              </Button>
              <span className="ml-2 text-xs">Items per Page</span>
              <Select
                value={String(perPage)}
                onValueChange={(value) => {
                  setPerPage(Number(value));
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-16 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      </SectionShell>
    </div>
  );
}
