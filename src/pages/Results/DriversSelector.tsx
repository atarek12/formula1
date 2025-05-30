import {
  Button,
  Dropdown,
  makeStyles,
  Option,
  tokens,
  type OptionOnSelectData,
  type SelectionEvents,
} from "@fluentui/react-components";
import { DismissRegular } from "@fluentui/react-icons";
import React, { useId, useMemo, useRef } from "react";
import type { TDriver } from "~/API";
import { getDriverFullName } from "~/helpers";
import { MobileMediaQuery } from "~/helpers/const";

const useStyles = makeStyles({
  root: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",

    [`@media ${MobileMediaQuery}`]: {
      marginBottom: "20px",
    },
  },
  listbox: {
    maxHeight: "200px",
  },
  tagsList: {
    listStyleType: "none",
    marginBottom: tokens.spacingVerticalXXS,
    marginTop: 0,
    paddingLeft: 0,
    display: "flex",
    gridGap: tokens.spacingHorizontalXXS,
    maxWidth: "calc(100vw - 40px)",
    overflowX: "auto",
    "::-webkit-scrollbar": {
      display: "none",
    },
    scrollbarWidth: "none",
  },
});

interface DriversSelectorProps {
  drivers: TDriver[];
  selectedDriverIds: string[];
  onSelectedDriverIdsChange: (selectedDrivers: string[]) => void;
}

export const DriversSelector: React.FC<DriversSelectorProps> = ({
  drivers,
  selectedDriverIds,
  onSelectedDriverIdsChange,
}) => {
  const styles = useStyles();

  // generate ids for handling labelling
  const comboId = useId();
  const selectedListId = `${comboId}-selection`;

  // refs for managing focus when removing tags
  const selectedListRef = useRef<HTMLUListElement>(null);
  const comboboxInputRef = useRef<HTMLInputElement>(null);

  const sortedDrivers = useMemo(() => {
    return drivers.sort((a, b) => {
      const nameA = getDriverFullName(a).toLowerCase();
      const nameB = getDriverFullName(b).toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }, [drivers]);

  const selectedDrivers = useMemo(() => {
    return sortedDrivers.filter((driver) =>
      selectedDriverIds.includes(driver.driverId),
    );
  }, [sortedDrivers, selectedDriverIds]);

  const onOptionSelect = (
    _event: SelectionEvents,
    data: OptionOnSelectData,
  ) => {
    onSelectedDriverIdsChange?.(data.selectedOptions);
  };

  const onTagClick = (option: string, index: number) => {
    // remove selected option
    onSelectedDriverIdsChange(selectedDriverIds.filter((o) => o !== option));

    // focus previous or next option, defaulting to focusing back to the combo input
    const indexToFocus = index === 0 ? 1 : index - 1;
    const optionToFocus = selectedListRef.current?.querySelector(
      `#${comboId}-remove-${indexToFocus}`,
    );
    if (optionToFocus) {
      (optionToFocus as HTMLButtonElement).focus();
    } else {
      comboboxInputRef.current?.focus();
    }
  };

  const labelledBy =
    selectedDriverIds.length > 0 ? `${comboId} ${selectedListId}` : comboId;

  return (
    <div className={styles.root}>
      <Dropdown
        multiselect
        ref={comboboxInputRef}
        aria-labelledby={labelledBy}
        placeholder="Select & highlight drivers"
        positioning={{ autoSize: "width" }}
        listbox={{ className: styles.listbox }}
        value={""}
        selectedOptions={selectedDriverIds}
        onOptionSelect={onOptionSelect}
      >
        {sortedDrivers.map((driver) => (
          <Option key={driver.driverId} value={driver.driverId}>
            {getDriverFullName(driver)}
          </Option>
        ))}
      </Dropdown>
      {selectedDrivers.length ? (
        <ul
          id={selectedListId}
          className={styles.tagsList}
          ref={selectedListRef}
        >
          {/* The "Remove" span is used for naming the buttons without affecting the Combobox name */}
          <span id={`${comboId}-remove`} hidden>
            Remove
          </span>
          {selectedDrivers.map((driver, i) => (
            <li key={driver.driverId}>
              <Button
                size="small"
                shape="circular"
                appearance="primary"
                icon={<DismissRegular fontSize={14} />}
                iconPosition="after"
                onClick={() => onTagClick(driver.driverId, i)}
                id={`${comboId}-remove-${i}`}
                aria-labelledby={`${comboId}-remove ${comboId}-remove-${i}`}
              >
                {getDriverFullName(driver)}
              </Button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
