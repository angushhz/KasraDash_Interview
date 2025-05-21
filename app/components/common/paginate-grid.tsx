import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginatedGridProps {
  items: React.ReactNode[];
  itemsPerPage?: number;
  title: string;
  emptyMessage?: string;
  gridClassName?: string;
}

export function PaginatedGrid({ 
  items, 
  itemsPerPage = 8, 
  title, 
  emptyMessage = "No items to display.", 
  gridClassName
}: PaginatedGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{title}</h2>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-muted-foreground">{emptyMessage}</p>
      ) : (
        <>
          <div className={gridClassName}>
            {currentItems}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(i + 1)}
                    className="w-8 h-8 p-0"
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
