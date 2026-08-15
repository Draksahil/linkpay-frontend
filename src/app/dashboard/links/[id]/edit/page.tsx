"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Topbar } from "@/components/layout/topbar";
import { LinkForm } from "@/components/dashboard/link-form";
import { Card, CardBody } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { linksService } from "@/services/links";
import { CreatorLink } from "@/types";

export default function EditLinkPage() {
  const params = useParams<{ id: string }>();
  const [link, setLink] = useState<CreatorLink | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    linksService.getById(params.id).then((res) => (res.success ? setLink(res.data ?? null) : setError(true)));
  }, [params.id]);

  return (
    <div>
      <Topbar title="Edit Link" />
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <Card className="mx-auto max-w-xl">
          <CardBody>
            {error && <ErrorState message="Couldn't load this link." />}
            {!error && !link && <Skeleton className="h-96" />}
            {link && <LinkForm initial={link} />}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
