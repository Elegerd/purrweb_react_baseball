import request from "@helpers/request";

export function profileDataRequest({ id }) {
  return request
    .post("api/v1/graphql", {
      query: `
      query Profile($id:String!) {
        profile(id: $id) {
          id
          first_name
          last_name
          position
          position2
          school_year
          avatar
          throws_hand
          bats_hand
          biography
          feet
          inches
          weight
          age
          recent_events {
            id
            event_type
            event_name
            date
            is_pitcher
            data_rows_count
            recent_avatars {
              id
              first_name
              last_name
              avatar
            }
          }
          winsgspan
          grip_right
          grip_left
          wrist_to_elbow
          broad_jump
          grip_left
          act_score
          gpa_score
          sat_score
          batting_top_values {
            pitch_type
            distance
            launch_angle
            exit_velocity
          }
          pitching_top_values {
            velocity
            spin_rate
            pitch_type
          }
          pitcher_summary {
            velocity
            spin_rate
            horizontal_break
          }
          batter_summary {
            exit_velocity
            distance
            launch_angle
          }
          school {
            id
            name
          }
          teams {
            id
            name
          }
          facilities {
            id
            email
            u_name
          }
        }
      }
    `,
      variables: { id },
    })
    .then(({ data }) => data);
}

export function currentProfileDataRequest() {
  return request
    .post("api/v1/graphql", {
      query: `
      query {
        current_profile() {
          id
          first_name
          last_name
          position  
          position2
          school_year
          throws_hand
          biography
          feet
          inches
          weight
          age
          school {
            id
            name
          }
          teams {
            id
            name
          }
          facilities {
            id
            email
            u_name
          }
        }
      }
    `,
    })
    .then(({ data }) => data);
}

export function updateProfileRequest(profile) {
  return request
    .post("api/v1/graphql", {
      query: `
            mutation UpdateProfile($form:UpdateProfileInput!) {
                update_profile (input:$form) {
                    profile {
                        id
                        first_name
                        last_name
                        position
                        position2
                        avatar
                        throws_hand
                        bats_hand
                        biography
                        school_year
                        feet
                        inches
                        weight
                        age
                        recent_events {
                            id
                            event_type
                            event_name
                            date
                            recent_avatars {
                                id
                                first_name 
                                last_name
                                avatar
                            } 
                        }
                        school {
                            id
                            name
                        }
                        teams {
                            id
                            name
                        }
                        facilities {
                            id
                            email
                            u_name
                        }
                    }
                }
            }
        `,
      variables: { form: profile },
    })
    .then(({ data }) => data);
}
