import request from "@helpers/request";

export function battingSummaryRequest({ id }) {
  return request
    .post("api/v1/graphql", {
      query: `
      query BattingSummary($id:ID!) {
        batting_summary(id: $id) {
          top_values {
            id
            distance
            pitch_type
            launch_angle
            exit_velocity
          }
          average_values {
            id
            distance
            pitch_type
            launch_angle
            exit_velocity
          }
        }
      }
    `,
      variables: { id },
    })
    .then(
      ({
        data: {
          data: { batting_summary },
        },
      }) => batting_summary
    );
}

export function battingGraphRequest({ profile_id, pitch_type = "" }) {
  return request
    .post("api/v1/graphql", {
      query: `
      query BattingGraph($input:FilterGraphInput!) { 
        batting_graph(input: $input) {
          graph_rows
        }
      }
    `,
      variables: { input: { profile_id, pitch_type } },
    })
    .then(
      ({
        data: {
          data: { batting_graph },
        },
      }) => batting_graph
    );
}

export function battingLogRequest(data) {
  return request
    .post("api/v1/graphql", {
      query: `
      query BattingLog($input:FilterBattingLogInput!) {
        batting_log(input: $input) {
          batting_log {
            date
            pitcher_name
            pitcher_handedness
            pitch_type
            pitch_call
            exit_velocity
            launch_angle
            direction
            distance
            hit_spin_rate
            hang_time
            pitcher_datraks_id
          }
          total_count
        }
      }
    `,
      variables: {
        input: data,
      },
    })
    .then(
      ({
        data: {
          data: { batting_log },
        },
      }) => batting_log
    );
}
