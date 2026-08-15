import { Topbar } from "@/components/layout/topbar";
import { LinkForm } from "@/components/dashboard/link-form";
import { Card, CardBody } from "@/components/ui/card";

export default function NewLinkPage() {
  return (
    <div>
      <Topbar title="Add New Link" />
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <Card className="mx-auto max-w-xl">
          <CardBody>
            <LinkForm />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
