import request from "./request";

export function fetchData(query) {
  return request.post("/api/v1/graphql", { query }).then(({ data }) => {
    console.log(data);
  });
}
