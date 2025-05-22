import {
  Card,
  CardHeader,
  CardPreview,
  Link,
  makeStyles,
  Text,
  Tooltip,
} from "@fluentui/react-components";
import {
  ArrowRightRegular,
  CalendarAgendaRegular,
  WindowNewRegular,
} from "@fluentui/react-icons";
import React from "react";
import type { IGetSeasonsResponse } from "~/API";
import { ButtonLink } from "~/components";
import { getRacesLink } from "~/helpers/utils";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "16px",
  },
});

interface SeasonsGridProps {
  data: IGetSeasonsResponse;
}

export const SeasonsGrid: React.FC<SeasonsGridProps> = ({ data }) => {
  const styles = useStyles();
  const linkRef = React.useRef<HTMLAnchorElement>(null);

  const onCardClick = () => {
    linkRef.current?.click();
  };

  const onCardKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>) => {
    if (ev.key === "Enter") {
      onCardClick();
    }
  };

  return (
    <div className={styles.root}>
      {data.SeasonTable.Seasons.map((item) => (
        <Card
          key={item.season}
          orientation="horizontal"
          onClick={onCardClick}
          onKeyDown={onCardKeyDown}
          focusMode="tab-exit"
        >
          <CardPreview>
            <CalendarAgendaRegular fontSize={50} />
          </CardPreview>

          <CardHeader
            header={<Text weight="semibold">Season: {item.season}</Text>}
            description={
              <Link
                href={item.url}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Wikipedia <WindowNewRegular />
              </Link>
            }
            action={
              <Tooltip
                content={`View races for season ${item.season}`}
                relationship="label"
              >
                <ButtonLink
                  ref={linkRef}
                  iconPosition="after"
                  icon={<ArrowRightRegular />}
                  to={getRacesLink(item.season)}
                />
              </Tooltip>
            }
          />
        </Card>
      ))}
    </div>
  );
};
