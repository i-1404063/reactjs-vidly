import _ from "lodash";

export function Paginate(items, pageSize, currentPage) {
    const startIndex = (currentPage - 1) * pageSize;
    const movies = _(items).slice(startIndex).take(pageSize).value();

    return movies;
}