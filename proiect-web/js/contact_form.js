// IV.4 Definirea funcției pentru formular
function submitForm() {
    // IV.6 Salvarea valorilor în constante
    // Folosim ID-urile definite în HTML (nume, email, mesaj)
    const nume = document.getElementById("nume").value;
    const email = document.getElementById("email").value;
    const mesaj = document.getElementById("mesaj").value;
   
    // IV.7 Printare în consolă
    console.log("Nume utilizator:", nume);
    console.log("Email utilizator:", email);
    console.log("Mesaj trimis:", mesaj);

    // IV.8 Printare avertizare la final
    console.warn("Goodbye World!");
}