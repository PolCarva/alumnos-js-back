// Middleware de autenticación simplificado
// Este middleware no hace verificación real de tokens
// Se usa como un middleware "pasante" para mantener compatibilidad
module.exports = function(req, res, next) {
  // Simplemente permite que todas las solicitudes pasen
  // y asigna el userId del parámetro de la ruta al req.user.id
  req.user = { 
    id: parseInt(req.params.userId || req.body.userId || 1)
  };
  
  next();
}; 