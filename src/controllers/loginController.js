const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

//Requerimos la base de datos
const db = require("../database/models");
const e = require("express");

//Aquí hago la asociación al módelo correspondiente
const User = db.User;

//Controlador del login
const loginController = {
  login: function (req, res) {
    res.render("user/blogin", {
      title: "Login",
    });
  },

  //Proceso el Login
  processLogin: (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      // Renderiza la vista de registro con los errores
      return res.render("user/blogin", {
        errors: error.mapped(),
        oldData: req.body,
      });
    }
    User.findAll({
      include: [
        {
          association: "Rol",
        },
      ],
    }).then((users) => {
      //defino un array vacio

      let usuarioLogueado = [];
      // Me traigo lo que ingresa el usuario en el formulario
      if (req.body.email != "" && req.body.password != "") {
        //busco en db el email que ingreso el usuario
        usuarioLogueado = users.filter(function (user) {
          return user.email === req.body.email;
        });
        //si el usuario no es encontrado en la db renderizo a login
        if (usuarioLogueado[0] == undefined) {
          return res.render("user/blogin", {
            errors: {
              email: {
                msg: "No se encuentra este email en nuestra base de datos",
              },
            },
          });
        }
        // controlo el pass que ingreso el usuario con el hasheado
        if (
          bcrypt.compareSync(req.body.password, usuarioLogueado[0].password) ===
          false
        ) {
          usuarioLogueado = [];
        }
      }
      // si el usuario ingresó mal la contraseña se renderiza al login
      if (usuarioLogueado.length === 0) {
        return res.render("user/blogin", {
          errors: {
            email: {
              msg: "Las credenciales son inválidas",
            },
          },
          title: "Login",
        });
      } else {
        //Aquí guardo en SESSION al usuario logueado
        delete usuarioLogueado[0].dataValues.password;
        req.session.userLogged = usuarioLogueado[0];
      }
      // controlo si el usuario marco recordar cookie
      if (req.body.remember_user) {
        res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 60 });
      }
      // redirecciono al perfil del usuario
      return res.redirect("/profile");
    });
  },

  profile: (req, res) => {
    res.render("user/profile", {
      title: "Perfil",
      user: req.session.userLogged,
    });
  },

  register: function (req, res) {
    res.render("user/bregister", {
      title: "Registro",
    });
  },
  processRegister: async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Renderiza la vista de registro con los errores
      return res.render("user/bregister", {
        errors: errors.mapped(),
        oldData: req.body,
      });
    }
    try {
      let userFound = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (userFound) {
        return res.render("user/bregister", {
          title: "Registro",
          error: {
            email: {
              msg: "Este correo ya se encuentra registrado",
            },
          },
          oldData: req.body,
        });
      }

      let user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: req.file ? req.file.filename : "usuario.png",
      };

      await User.create(user);
      res.redirect("/login");
    } catch (error) {
      console.log(error);
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("userLogged");
    return res.redirect("/");
  },

  edit: (req, res) => {
    res.render("user/edit", {
      title: "Editar",
      user: req.session.userLogged,
    });
  },
  update: async (req, res) => {
    let userId = req.params.id;

    let update = await User.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
      },
      {
        where: {
          id: userId,
        },
      }
    );

    res.redirect("/profile");
  },
  destroy: async (req, res) => {
    try {
      let userId = req.params.id;
      await User.destroy({
        where: {
          id: userId,
        },
      });
      res.redirect("/register");
    } catch (error) {
      console.error("Error al elmininar el usuario", error);
    }
  },
};

module.exports = loginController;
