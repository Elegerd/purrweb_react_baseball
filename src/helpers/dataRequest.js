import request from "./request";

export function leaderBoardBattingRequest({ type }) {
  return request
    .post("api/v1/graphql", {
      query: `
      query LeaderboardBatting($input:FilterLeaderboardInput!) {
        leaderboard_batting(input: $input) {
          leaderboard_batting { 
            batter_name
            exit_velocity
            launch_angle
            distance
            batter_datraks_id
            age
            school {
              id
              name
            }
            teams {
              id
              name
            }
            favorite
          }
        }
      }
    `,
      variables: { input: { type } },
    })
    .then(({ data }) => data);
}

export function notificationRequest({ count, offset }) {
  return request
    .post("api/v1/graphql", {
      query: `
      query Notifications($input:FilterNotificationsInput!) {
        notifications(input: $input) {
          notifications {
            id
            description
            link
          }
        }
      }  
    `,
      variables: { input: { count, offset } },
    })
    .then(({ data }) => data);
}

export function facilitiesRequest({ search = "" }) {
  return request
    .post("api/v1/graphql", {
      query: `
      query Facilities($search:String!) {
        facilities(search: $search) {
          facilities {
            id
            email
            u_name
          }
        }
      }
    `,
      variables: { search },
    })
    .then(
      ({
        data: {
          data: {
            facilities: { facilities },
          },
        },
      }) => facilities
    );
}

export function schoolsRequest({ search = "" }) {
  return request
    .post("api/v1/graphql", {
      query: `
      query Schools($search:String!) {
        schools(search: $search) {
          schools {
            id
            name
          }
        }
      }
    `,
      variables: { search },
    })
    .then(
      ({
        data: {
          data: {
            schools: { schools },
          },
        },
      }) => schools
    );
}

export function teamsRequest({ search = "" }) {
  return request
    .post("api/v1/graphql", {
      query: `
      query Teams($search:String!) {
        teams(search: $search) {
          teams {
            id
            name
          }
        }
      }
    `,
      variables: { search },
    })
    .then(
      ({
        data: {
          data: {
            teams: { teams },
          },
        },
      }) => teams
    );
}
