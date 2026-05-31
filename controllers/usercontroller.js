/* UserController on Userin tietokantaoperaatiot
ja autentikaation sisältävä kontrolleri.
Se sisältää kaksi metodia: registerUser jolla
luodaan uusi käyttäjä kantaan ja authenticateUser
jolla suoritetaan autentikaatio.
*/

import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import createToken from '../createtoken.js';

const UserController = {
  // uuden käyttäjän rekisteröinti
  async registerUser(req, res, next) {
    // Varmistetaan että pyynnön tekijä on kirjautunut sisään JA on admin
    if (!req.decoded || req.decoded.isadmin !== true) {
      return res.status(403).json({
        success: false,
        message: 'Vain admin-oikeuksilla voi luoda uusia käyttäjiä.',
      });
    }

    // passu kryptataan ennen kantaan laittamista
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
      isadmin: req.body.isadmin,
    }).catch((error) => {
      return res
        .status(500)
        .send('Käyttäjän rekisteröinti epäonnistui.' + error);
    });
    const token = createToken(user); // tokenin luontimetodi
    // palautetaan token JSON-muodossa
    res.json({
      success: true,
      message: 'Tässä on valmis Token!',
      token: token,
    });
  },

  // olemassa olevan käyttäjän autentikaatio
  // jos autentikaatio onnistuu, käyttäjälle luodaan token
  async authenticateUser(req, res, next) {
    // etsitään käyttäjä kannasta http-pyynnöstä saadun käyttäjätunnuksen perusteella
    const user = await User.findOne({
      username: req.body.username,
    }).catch((error) => {
      throw error;
    });
    if (!user) {
      res.json({
        success: false,
        message: 'Autentikaatio epäonnistui.',
      });
    } else if (user) {
      // console.log(req.body.password); // lomakkelle syötetty salasana
      // console.log(user.password); // kannassa oleva salasana
      // verrataan lomakkeelle syötettyä salasanaa kannassa olevaan salasanaan
      // jos vertailtavat eivät ole samat, palautetaan tieto siitä että salasana oli väärä
      if (bcrypt.compareSync(req.body.password, user.password) === false) {
        res.json({
          success: false,
          message: 'Autentikaatio epäonnistui.',
        });
      } else {
        // jos salasanat ovat samat, luodaan token
        const token = createToken(user); // tokenin luontimetodi
        // palautetaan token JSON-muodossa
        res.json({
          success: true,
          message: 'Tässä on valmis Token!',
          token: token,
        });
      }
    }
  },
};

export default UserController;
