import React, { useCallback } from "react";
import { useEventActionHandler } from "@webiny/app-page-builder/editor/hooks/useEventActionHandler";
import { TogglePluginActionEvent } from "@webiny/app-page-builder/editor/recoil/actions";
import { isPluginActiveSelector } from "@webiny/app-page-builder/editor/recoil/modules";
import { css } from "emotion";
import { IconButton } from "@webiny/ui/Button";
import { Tooltip } from "@webiny/ui/Tooltip";
import { useRecoilValue } from "recoil";

const activeStyle = css({
    ".mdc-icon-button__icon": {
        color: "var(--mdc-theme-primary)"
    }
});

const getButtonIcon = (icon: Element | Element[], isActive: boolean): Element => {
    if (Array.isArray(icon)) {
        return isActive ? icon[0] : icon[1];
    }
    return icon;
};
type ActionPropsType = {
    id?: string;
    icon: any;
    onClick?: () => any;
    tooltip?: string;
    plugin?: string;
};
const Action: React.FunctionComponent<ActionPropsType> = ({
    id,
    icon,
    onClick,
    tooltip,
    plugin
}) => {
    const handler = useEventActionHandler();
    const isActive = useRecoilValue(isPluginActiveSelector(plugin));

    const togglePlugin = useCallback(() => {
        if (!plugin) {
            return;
        }
        handler.trigger(
            new TogglePluginActionEvent({
                name: plugin
            })
        );
    }, [plugin]);

    const clickHandler = useCallback(() => {
        if (typeof onClick === "function") {
            return onClick();
        }
        togglePlugin();
    }, [plugin]);

    const btnIcon = getButtonIcon(icon, isActive);

    const iconButton = (
        <IconButton
            id={id}
            icon={btnIcon}
            onClick={clickHandler}
            className={isActive && activeStyle}
        />
    );

    if (tooltip) {
        return (
            <Tooltip
                placement={"right"}
                content={<span>{tooltip}</span>}
                {...(isActive ? { visible: false } : {})}
            >
                {iconButton}
            </Tooltip>
        );
    }

    return iconButton;
};

export default React.memo(Action);
