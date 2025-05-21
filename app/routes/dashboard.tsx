import { SectionCards } from "~/components/sidebar/section-cards";
import { SiteHeader } from "~/components/sidebar/site-header";
import type { Route } from "./+types/dashboard";
import { PendingSupplierCard } from "~/components/suppliers/pending-supplier-card";
import { useEventStore } from "~/store/event-store";
import { usePostStore } from "~/store/post-store";
import { useSupplierStore } from "~/store/supplier-store";
import { toast } from "sonner";
import { PendingEventCard } from "~/components/events/pending-event-card";
import { ReportedPostCard } from "~/components/reports/reported-post-card";
import { PaginatedGrid } from "~/components/common/paginate-grid";
import { ScrollArea } from "~/components/ui/scroll-area"


export function meta({}: Route.MetaArgs) {
  return [{ title: "New React Router App" }, { name: "description", content: "Welcome to React Router!" }];
}
export default function Page() {

  const posts = usePostStore((state) => state.posts);
  const deletePost = usePostStore((state) => state.deletePost);
  const suppliers = useSupplierStore((state) => state.suppliers);
  const approveSupplier = useSupplierStore((state) => state.approveSupplier);
  const events = useEventStore((state) => state.events);
  const approveEvent = useEventStore((state) => state.approveEvent);
  const rejectEvent = useEventStore((state) => state.rejectEvent);

  const pendingSuppliers = suppliers.filter((s) => s.status === "pending");
  const pendingEvents = events.filter((e) => e.status === "pending");
  const publishedPosts = posts.filter((p) => p.status === "published");
  const reportedPosts = posts.filter((p) => p.status === "reported");

  // Handlers
  const handleSupplierApprove = (id: string) => {
    approveSupplier(id);
    toast.success("Supplier approved");
  };

  const handleEventApprove = (id: string) => {
    approveEvent(id);
    toast.success("Event approved");
  };

  const handleEventReject = (id: string) => {
    rejectEvent(id);
    toast.success("Event rejected");
  };

  const handlePostDelete = (id: string) => {
    deletePost(id);
    toast.success("Post deleted");
  };

  const supplierCards = pendingSuppliers.map((supplier) => (
    <PendingSupplierCard key={supplier.id} supplier={supplier} onApprove={handleSupplierApprove} />
  ));

  const eventCards = pendingEvents.map((event) => (
    <PendingEventCard key={event.id} event={event} onApprove={handleEventApprove} onReject={handleEventReject} />
  ));

  const reportedPostCards = reportedPosts.map((post) => (
    <ReportedPostCard key={post.id} post={post} onView={handlePostDelete} />
  ));
  return (
    <>
      <SiteHeader title="Dashboard" />
      <ScrollArea className="h-[calc(100vh-var(--header-height)-8px)]">
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="space-y-8 px-6">
              {/* Pending Suppliers */}
              <PaginatedGrid
                title="Pending Suppliers"
                items={supplierCards}
                emptyMessage="No pending suppliers to approve."
                gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              />

              {/* Pending Events */}
              <PaginatedGrid
                title="Pending Events"
                items={eventCards}
                emptyMessage="No pending events to review."
                gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4"
              />

              {/* Reported Posts */}
              <PaginatedGrid
                title="Reported Posts"
                items={reportedPostCards}
                emptyMessage="No reported posts to review."
                gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4"
              />
            </div>
          </div>
        </div>
      </div>
      </ScrollArea>
    </>
  );
}
