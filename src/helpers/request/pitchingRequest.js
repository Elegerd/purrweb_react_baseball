import request from "@helpers/request";

export function pitchingSummaryRequest({ id }) {
  return request
    .post("api/v1/graphql", {
      query: `
      query PitchingSummary($id:ID!) {
        pitching_summary(id: $id) {
          top_values {
            id
            velocity
            spin_rate
            pitch_type
          }
          average_values{
            id
            velocity
            spin_rate
            pitch_type
          }
        }
      }
    `,
      variables: { id },
    })
    .then(
      ({
        data: {
          data: { pitching_summary },
        },
      }) => pitching_summary
    );
}

export function pitchingGraphRequest({ profile_id, pitch_type = "" }) {
  return request
    .post("api/v1/graphql", {
      query: `
      query PitchingGraph($input:FilterGraphInput!) {
        pitching_graph(input: $input) {
          graph_rows
        }
      }
    `,
      variables: { input: { profile_id, pitch_type } },
    })
    .then(
      ({
        data: {
          data: { pitching_graph },
        },
      }) => pitching_graph
    );
}

export function pitchingLogRequest({
  profile_id,
  batter_name = "",
  pitch_type = "",
  count = 0,
  offset = 10,
}) {
  return request
    .post("api/v1/graphql", {
      query: `
      query PitchingLog($input:FilterPitchingLogInput!) {
        pitching_log(input: $input) {
          pitching_log {
            date
            pitch_type
            pitch_call
            velocity
            spin_rate
            spin_axis
            tilt
            release_height
            release_side
            extension
            vertical_break
            horizontal_break
            height_at_plate
            batter_name
            batter_datraks_id
            batter_handedness
          }
          total_count
        }
      }
    `,
      variables: {
        input: {
          profile_id: profile_id,
          count,
          offset,
          batter_name,
          pitch_type,
        },
      },
    })
    .then(
      ({
        data: {
          data: { pitching_log },
        },
      }) => pitching_log
    );
}
