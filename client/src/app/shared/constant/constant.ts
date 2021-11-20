

export const TASK_STATUS_MAP = new Map([
    [1, "assigned"],
    [2, "unassigned"],
]);

export const TASK_PROGRESS_MAP = new Map([
    [1, "pending"],
    [2, "working"],
    [3, "completed"]
]);

export const TASK_PROGRESS_MAP_REV = new Map([
    ["pending", 1],
    ["working", 2],
    ["completed", 3]
]);
