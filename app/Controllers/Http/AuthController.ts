import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/User'
import UserValidator from '../../Validators/UserValidator'

export default class AuthController {
  public async register({request}: HttpContextContract) {
     const data = await request.validate(UserValidator)
     const user = await User.create(data)
     return user
  }
  
  public async login({request, response, auth}: HttpContextContract){
    try{
      const {email, password} = request.all()
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '1day'
      })
      const  user = await User.findByOrFail('email',email)
      return {token, user}  
     } catch (error){
        response.status(401).send("Login ou senha incorreta!!!")
     }
  }
 
}