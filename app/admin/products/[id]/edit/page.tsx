import React from "react";
import { fetchAdminProductDetails, updateProductAction } from "@/utils/actions";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import SubmitButton from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
async function EditPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = await fetchAdminProductDetails(id);
  const { name, company, description, featured, price } = product;
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">update product</h1>
      <div className="border p-8 rounded">
        <FormContainer action={updateProductAction}>
          <div className="grid gap-4 md:grid-2 my-4">
            <input type="hidden" name="id" value={id} />
            <FormInput
              type="text"
              name="name"
              label="Product Name"
              defaultValue={name}
            />
            <PriceInput defaultValue={price} />
            <FormInput
              type="text"
              name="company"
              label="Company"
              defaultValue={company}
            />
            <CheckboxInput
              name="featured"
              label="Featured"
              defaultChecked={featured}
            />
            <TextAreaInput name="description" defaultValue={description} />
          </div>
          <div className="mt-4">
            <SubmitButton text="update product" />
          </div>
        </FormContainer>
      </div>
    </section>
  );
}

export default EditPage;
