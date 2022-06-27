import { IUser } from "../interface/user.interface"
import { UserModel } from "../schema/user.schema"

class UserService {
  /**
   * Create a new book
   * @param {IUser} data
   * @returns {Promise<IUser>}
   */
  async findOrCreate(data: IUser): Promise<IUser> {
    const user = await UserModel.findOne({ ...data });
    
    if (!user) {
      const newUser = new UserModel(data);
      const validUser = newUser.validateSync();
      if (validUser) {
        throw new Error(validUser.message);
      }
      return await newUser.save();
    }
    return user;
  }

}
export default new UserService();