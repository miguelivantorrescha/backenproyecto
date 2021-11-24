import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {request} from 'https';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';


export class EstrategiaAdministrador implements AuthenticationStrategy{
  name:string='admin';
constructor(
@service(AutenticacionService)
public servicioutenticacion:AutenticacionService
){}

async  authenticate(request: Request):Promise<UserProfile | undefined>{
  let token=parseBearerToken(request);
  if(token){
      let datos=this.servicioutenticacion.ValidarTokenJWT(token);
      if (datos){// aqui otro if para los roles ojo
        let perfil: UserProfile=Object.assign({
          nombre:datos.data.nombre
        });
        return perfil;
      }else{
        throw new HttpErrors[401]("no hay token para ejecutar la solicitud")
      }
  }else{
    throw new HttpErrors[401]("no hay tokenen la solicitud")
  }
}
}
