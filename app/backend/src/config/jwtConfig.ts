import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';

type JwtConfig = {
  secret: jwt.Secret;
  expiresIn: jwt.SignOptions['expiresIn'];
  algorithm: jwt.Algorithm;
};

const jwtConfig: JwtConfig = {
  secret: readFileSync('jwt.evaluation.key', 'utf8'),
  expiresIn: '3d',
  algorithm: 'HS256',
};

export default jwtConfig;
