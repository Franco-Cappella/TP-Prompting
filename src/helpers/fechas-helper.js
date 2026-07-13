//IAAAA
class FechasHelper {

    calcularEdad = (fechaNacimiento) => {
        if (!fechaNacimiento) return null;
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mesDiff = hoy.getMonth() - nacimiento.getMonth();
        if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        return edad;
    }

    agregarEdad = (alumno) => {
        if (!alumno) return alumno;
        return { ...alumno, edad: this.calcularEdad(alumno.fecha_nacimiento) };
    }
}

export default new FechasHelper();
