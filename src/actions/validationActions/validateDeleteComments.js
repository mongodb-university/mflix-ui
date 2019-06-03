import * as types from "../actionTypes"
import {
  beginTicketValidation,
  genRandomUser,
  register,
  submitComment,
  deleteComment,
  deleteUser,
  getMovie,
} from "./validationHelpers"

// the martian
const movie_id = "573a13eff29313caabdd82f3"
export function validateDeleteComments() {
  return async dispatch => {
    try {
      dispatch(beginTicketValidation("DeleteComments"))

      // create the user who will own this comment
      const commentOwner = genRandomUser()
      const ownerRegisterResponse = await register(commentOwner)
      const ownerAuthToken = ownerRegisterResponse.json.auth_token

      // create another user who will attempt to delete the comment
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

      // using otherAuthToken, should not be able to delete this comment
      const badResponse = await deleteComment(
        firstCommentID,
        otherAuthToken,
        movie_id,
      )

      try {
        let badResponseCommentId
        // check to see if the api returns a successful or failure status code
        if (badResponse.ok) {
          badResponseCommentId = badResponse.json.comments[0]._id
          // if the first (latest) comment associated with The Martian has changed,
          // then this bad delete was actually successful - this will throw an error
          if (badResponseCommentId !== firstCommentID) {
            throw new Error("Was able to delete a comment that wasn't owned")
          }
        }
        badC = true
      } catch (e) {
        throw e
      }
      // using ownerAuthToken, should be able to successfully delete this comment
      await deleteComment(firstCommentID, ownerAuthToken, movie_id)

      const updatedMovie = await getMovie(movie_id)
      let newCommentID
      try {
        newCommentID = updatedMovie.movie.comments[0]._id
      } catch (e) {
        throw new Error("Unable to retrieve movie comments")
      }

      // if the first comment associated with The Martian has NOT changed, then
      // this good delete was unsuccessful - this will throw an error
      if (newCommentID === firstCommentID) {
        throw new Error("Deletion was performed but unsuccessful")
      } else {
        goodC = true
      }

      if (postC && badC && goodC) {
        deleteUser(ownerAuthToken, commentOwner)
        deleteUser(otherAuthToken, otherUser)
        return dispatch(validateDeleteCommentsSuccess())
      } else {
        return dispatch(
          validateDeleteCommentsError(
            new Error("The return from the api was incorrect"),
          ),
        )
      }
    } catch (e) {
      return dispatch(validateDeleteCommentsError(new Error(e.message)))
    }
  }
}

export function validateDeleteCommentsSuccess() {
  return { type: types.VALIDATE_DELETE_COMMENTS_SUCCESS }
}

export function validateDeleteCommentsError(error) {
  return { type: types.VALIDATE_DELETE_COMMENTS_ERROR, error }
}
