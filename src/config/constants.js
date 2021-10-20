export const  slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export const formatThousandsNumber = (x) => {
    return x == null || typeof(x) ==="string" ? 0 : x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export const passwordValidation = (exp) => {
  // return exp.match('^[A-Za-z]{7,14}$');
  return true;
}

export const memberSexTypes = {
    M : { short: "M", long: "Masculin"},
    F : { short: "F", long: "Féminin" },
}

export const memberMaritalStatusTypes = {
  single : { value: "single", label: "Célibataire"},
  married : { value: "married", label: "Marié(e)"},
  widowhood: { value: "widowhood", label: "Veuf / Veuve "}
}

export const signUpTypes = {
  member: "MEMBER",
  partner: "PARTNER"
}