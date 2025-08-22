
import { ResultCodesEnum, ResponseType } from "../api/api"
import { usersAPI } from "../api/users-api"
import { actions, follow } from "./usersReduser"


jest.mock("../api/users-api")
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const result: ResponseType = {
resultCode : ResultCodesEnum.Success,
messages : [],
data: {}
}
test("follow thunk success", async ()=> {
const thunk = follow(1)
const dispatchMock = jest.fn()
const getStateMock = jest.fn()

usersAPIMock.follow.mockReturnValue(Promise.resolve(result))


await thunk(dispatchMock, getStateMock, {})


expect(dispatchMock).toHaveBeenCalledTimes(3)

})