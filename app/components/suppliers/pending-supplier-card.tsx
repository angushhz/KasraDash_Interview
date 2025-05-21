import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { type Supplier } from "~/store/supplier-store";

interface PendingSupplierCardProps {
  supplier: Supplier;
  onApprove: (id: string) => void;
}

export function PendingSupplierCard({ supplier, onApprove }: PendingSupplierCardProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="pt-6">
        <div className="space-y-1">
          <h3 className="font-semibold">{supplier.name}</h3>
          <p className="text-sm text-muted-foreground">{supplier.email}</p>
          <div className="h-2 w-24 bg-muted rounded mt-2"></div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => onApprove(supplier.id)}>Approve</Button>
      </CardFooter>
    </Card>
  );
}