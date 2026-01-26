import React from "react";
import EmptyList from "@/components/global/EmptyList";
import { deleteProductAction, fetchAdminProducts } from "@/utils/actions";
import Link from "next/link";

import { formatCurrency } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaEdit } from "react-icons/fa";
import { IconButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
async function AdminProductsPage() {
  const items = await fetchAdminProducts();
  if (items.length === 0) {
    return <EmptyList />;
  }
  console.log(items);

  return (
    <Table>
      <TableCaption>total products: {items.length}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Product Name</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => {
          const { id: productId, name, company, price } = item;
          return (
            <TableRow key={productId}>
              <TableCell className="font-medium">
                <Link href={`/products/${productId}`}>{name}</Link>
              </TableCell>
              <TableCell>{company}</TableCell>
              <TableCell>{formatCurrency(price)}</TableCell>
              <TableCell className="flex items-center">
                <Link href={`/admin/products/${productId}/edit`}>
                  <IconButton actionType="edit" />
                </Link>
                <DeleteProduct productId={productId} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
async function DeleteProduct({ productId }: { productId: string }) {
  const deleteProduct = await deleteProductAction.bind(null, { productId });
  return (
    <FormContainer action={deleteProduct}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
}

export default AdminProductsPage;
