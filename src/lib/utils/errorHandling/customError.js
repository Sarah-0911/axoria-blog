export default class AppError extends Error {
  constructor(message = "An error has occured") {
    super(message) // Utilise la propriété 'message' native d’Error
    this.name = "AppError" // Nom affiché dans les logs ou le catch
  }
}

// 💡 Classe d’erreur personnalisée qui hérite de la classe native Error
// Sert à différencier les erreurs "contrôlées" de celles venant de bibliothèques ou du système