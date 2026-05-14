import type { UnknownCluster } from "@/lib/types/unknowns";
import { ClusterCard } from "./ClusterCard";

type Props = {
  clusters: UnknownCluster[];
  loading: boolean;
  onOpen: (clusterId: number) => void;
};

export function ClusterGrid({ clusters, loading, onOpen }: Props) {
  if (clusters.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center px-4 py-16 text-center text-sm text-muted-foreground">
        {loading ? (
          "Loading unknown clusters…"
        ) : (
          <span>
            No unknown faces yet — every recent capture matched a known employee.
            <br />
            If a camera isn't seeing unknowns, check that unknown capture is enabled in the runtime settings.
          </span>
        )}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {clusters.map((c) => (
        <ClusterCard key={c.id} cluster={c} onOpen={onOpen} />
      ))}
    </div>
  );
}
