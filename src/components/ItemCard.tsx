import {
  Card,
  CardPreview,
  CardHeader,
  Tooltip,
} from "@fluentui/react-components";
import { ArrowRightRegular } from "@fluentui/react-icons";
import React, { useRef } from "react";
import { ButtonLink } from "./ButtonLink";

interface ItemCardProps {
  header: React.ReactNode;
  description: React.ReactNode;
  icon?: React.ReactNode;
  url?: string;
  tooltip?: string;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  header,
  description,
  icon,
  url,
  tooltip,
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const onCardClick = () => {
    linkRef.current?.click();
  };

  const onCardKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.key === "Enter") {
      onCardClick();
    }
  };

  return (
    <Card
      orientation="horizontal"
      onClick={url ? onCardClick : undefined}
      onKeyDown={url ? onCardKeyDown : undefined}
    >
      {icon && <CardPreview>{icon}</CardPreview>}

      <CardHeader
        header={header}
        description={description}
        action={
          url && (
            <Tooltip content={tooltip || ""} relationship="label">
              <ButtonLink
                ref={linkRef}
                iconPosition="after"
                icon={<ArrowRightRegular />}
                to={url}
              />
            </Tooltip>
          )
        }
      />
    </Card>
  );
};
