import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
} from "@fluentui/react-components";
import React from "react";

interface AppBreadcrumbsProps {}

export const AppBreadcrumbs: React.FC<AppBreadcrumbsProps> = () => {
  const items = [{ name: "All Seasons", path: "/" }];

  return (
    <Breadcrumb aria-label="Application breadcrumb">
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;
        return (
          // eslint-disable-next-line react-x/no-array-index-key
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbButton href={item.path} current={isLastItem}>
                {item.name}
              </BreadcrumbButton>
            </BreadcrumbItem>
            {!isLastItem && <BreadcrumbDivider />}
          </React.Fragment>
        );
      })}
    </Breadcrumb>
  );
};
