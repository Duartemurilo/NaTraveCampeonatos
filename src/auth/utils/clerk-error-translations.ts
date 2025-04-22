export const clerkErrorCodeTranslations: Record<string, string> = {
  // 🔐 Autenticação
  form_password_incorrect:
    'A senha digitada não está correta. Tente novamente ou clique em "Esqueci minha senha".',
  "Invalid authentication": "Autenticação inválida",
  "Invalid password": "Senha inválida",

  // 🚫 Conta bloqueada
  "Account locked":
    "Sua conta está bloqueada. Você poderá tentar novamente em 30 minutos. Para mais informações, entre em contato com o suporte.",
  "Your account is locked":
    "Sua conta está bloqueada. Você poderá tentar novamente em 30 minutos. Para mais informações, entre em contato com o suporte.",

  // 📧 Email
  form_identifier_not_found: "Não encontramos uma conta com esse e-mail.",

  "Couldn't find your account.": "Não encontramos uma conta com esse e-mail.",

  "This email address already exists":
    "Já existe uma conta com esse e-mail. Se for sua, tente entrar!",
  form_identifier_exists: "Já existe uma conta com esse e-mail. Se for sua, tente entrar!",
  form_param_format_email_address: "O e-mail informado é inválido.",
  "Invalid email address": "O e-mail informado é inválido.",
  "already exists": "Já existe uma conta com esse e-mail. Se for sua, tente entrar!",

  // 🔐 Senha
  form_password_pwned:
    "Essa senha foi comprometida em vazamentos públicos. Por segurança, escolha outra.",
  "Password does not meet complexity requirements":
    "A senha não atende aos requisitos de complexidade.",

  // 👤 Usuário
  "User not found": "Usuário não encontrado",
  "Unable to authenticate the request": "Não foi possível autenticar a solicitação.",
  "You are not authorized to perform this request":
    "Você não está autorizado a realizar esta solicitação.",

  // 📤 Código de verificação
  form_code_incorrect: "O código digitado está incorreto. Verifique e tente novamente.",

  // ⚠️ Gerais
  "An error occurred": "Ocorreu um erro. Tente novamente.",
  "Invalid request": "Solicitação inválida.",
  "Request only valid for": "Solicitação válida apenas para o contexto apropriado.",
};
