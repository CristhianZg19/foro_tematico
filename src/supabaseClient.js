// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Verifica que las variables de entorno estén definidas
if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Error: Las claves de Supabase no están definidas en las variables de entorno.");
} else {
    console.log("Supabase URL y clave anónima cargadas correctamente.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Realiza una consulta de prueba para confirmar la conexión
const testConnection = async () => {
    try {
        const { error } = await supabase.from('posts').select('*').limit(1); // Puedes reemplazar 'test_table' por una tabla real en tu base de datos
        if (error) {
            console.error("Error al conectar con Supabase:", error.message);
        } else {
            console.log("Conexión con Supabase realizada exitosamente.");
        }
    } catch (error) {
        console.error("Error en la conexión con Supabase:", error.message);
    }
};

// Ejecuta la función de prueba de conexión al cargar el módulo
testConnection();
