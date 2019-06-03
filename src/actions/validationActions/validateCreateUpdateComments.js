import * as types from "../actionTypes"
import {
  beginTicketValidation,
  genRandomUser,
  deleteUser,
  register,
  submitComment,
  editComment,
  deleteComment,
  getMovie,
} from "./validationHelpers"

// men in black
const movie_id = "573a139af29313caabcf0b0a"
export function validateCreateUpdateComments() {
  return async dispatch => {
    try {
      dispatch(beginTicketValidation("CreateUpdateComments"))

      // create the user who will own this comment
      const commentOwner = genRandomUser()
      const ownerRegisterResponse = await register(commentOwner)
      const ownerAuthToken = ownerRegisterResponse.json.auth_token

      // create another user who will attempt to update the comment
      const otherUser = genRandomUser()
      const otherRegisterResponse = await register(otherUser)
      const otherAuthToken = otherRegisterResponse.json.auth_token

      let postC, badC, goodC
      const commentResponse = await submitComment(
        movie_id,
        "feefee",
        ownerAuthToken,
      )
      if (!commentResponse.ok) {
        throw new Error("Unable to post a comment")
      } else {
        postC = true
      }

      // make sure Get Comments ticket has been completed
      let firstCommentID
      try {
        firstCommentID = commentResponse.json.comments[0]._id
      } catch (e) {
        throw new Error("Unable to retrieve movie comments")
      }

      // try to update comment with a different auth token - this should fail
      const badResponse = await editComment(
        firstCommentID,
        "badCommentText",
        otherAuthToken,
        movie_id,
      )

      if (badResponse.ok) {
        throw new Error("Was able to update a comment that wasn't owned")
      } else {
        badC = true
      }

      // try to update comment with the correct auth token - this should succeed
      const newCommentText = "fazzlebizzle"
      const goodUpdate = await editComment(
        firstCommentID,
        newCommentText,
        ownerAuthToken,
        movie_id,
      )
      if (goodUpdate.ok === false) {
        throw new Error("Unable to update comment")
      } else {
        goodC = true
      }

      const updatedMovie = await getMovie(movie_id)
      let updatedComment
      try {
        updatedComment = updatedMovie.movie.comments[0]
      } catch (e) {
        throw new Error("Unable to retrieve movie comments")
      }
      if (updatedComment.text !== newCommentText) {
        throw new Error("Update was performed but unsuccessful")
      }
      deleteComment(firstCommentID, ownerAuthToken, movie_id)
      if (postC && badC && goodC) {
        deleteUser(ownerAuthToken, commentOwner)
        deleteUser(otherAuthToken, otherUser)
        return dispatch(validateCreateUpdateCommentsSuccess())
      } else {
        return dispatch(
          validateCreateUpdateCommentsError(
            new Error("The return from the api was incorrect"),
          ),
        )
      }
    } catch (e) {
      return dispatch(validateCreateUpdateCommentsError(new Error(e.message)))
    }
  }
}

export function validateCreateUpdateCommentsSuccess() {
  return { type: types.VALIDATE_CREATE_UPDATE_COMMENTS_SUCCESS }
}

export function validateCreateUpdateCommentsError(error) {
  return { type: types.VALIDATE_CREATE_UPDATE_COMMENTS_ERROR, error }
}
