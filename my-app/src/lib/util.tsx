// Convert text to title case
export const toTitleCase = (name: string | undefined) => {
    if (!name) return;
    return name
        .toLowerCase()
        .split(/\s+/) // split on one or more spaces
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}