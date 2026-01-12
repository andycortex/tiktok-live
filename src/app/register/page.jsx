"use client";

import { useState, useEffect } from "react"; // Import useEffect
import { useRouter } from "next/navigation"; // Import useRouter
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input_login";
import Button from "@/components/ui/Button";
import Card, { CardHeader, CardContent } from "@/components/ui/Card";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    whatsapp: "",
    ciudad: "",
    direccion: "",
    empresa: "",
    tiktok: "",
    terms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in (e.g., by checking for a 'token' cookie)
    // This check is simplified; a real app would verify the token's validity.
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (token) {
      router.push("/live");
    }
  }, [router]);

  const handleInputChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      setSuccess(true);
      // Optionally redirect to login page after successful registration
      // router.push('/login');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="pt-20 pb-8 px-4 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <Card>
            <CardHeader>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
                <i className="fab fa-tiktok text-4xl tiktok-gradient"></i>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Únete a TikTok Live
              </h1>
              <p className="text-white/90">
                Crea tu cuenta y comienza a transmitir
              </p>
            </CardHeader>
            <CardContent>
              {success ? (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-green-600">
                    ¡Registro exitoso!
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Tu cuenta ha sido creada. Ya puedes iniciar sesión.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <i className="fas fa-user text-purple-600"></i>
                      Información Personal
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        id="nombre"
                        label="Nombre"
                        required
                        placeholder="Juan"
                        icon="fas fa-user"
                        onStateChange={handleInputChange("nombre")}
                      />
                      <Input
                        id="apellido"
                        label="Apellido"
                        required
                        placeholder="Pérez"
                        icon="fas fa-user"
                        onStateChange={handleInputChange("apellido")}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <i className="fas fa-lock text-purple-600"></i>
                      Información de Cuenta
                    </h3>
                    <Input
                      id="email"
                      label="Email (Usuario)"
                      type="email"
                      required
                      placeholder="usuario@ejemplo.com"
                      icon="fas fa-envelope"
                      onStateChange={handleInputChange("email")}
                    />
                    <Input
                      id="password"
                      label="Contraseña"
                      type="password"
                      required
                      minlength="6"
                      placeholder="••••••"
                      icon="fas fa-lock"
                      onStateChange={handleInputChange("password")}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <i className="fas fa-phone text-purple-600"></i>
                      Información de Contacto
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        id="whatsapp"
                        label="WhatsApp"
                        type="tel"
                        required
                        placeholder="+591 700 000 00"
                        icon="fab fa-whatsapp"
                        onStateChange={handleInputChange("whatsapp")}
                      />
                      <Input
                        id="ciudad"
                        label="Ciudad"
                        required
                        placeholder="Tarija/Cercado"
                        icon="fas fa-map-marker-alt"
                        onStateChange={handleInputChange("ciudad")}
                      />
                    </div>
                    <Input
                      id="direccion"
                      label="Dirección"
                      required
                      placeholder="Calle Principal, 123"
                      icon="fas fa-home"
                      onStateChange={handleInputChange("direccion")}
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <i className="fas fa-briefcase text-purple-600"></i>
                      Información Profesional
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        id="empresa"
                        label="Empresa"
                        required
                        placeholder="Mi Empresa S.L."
                        icon="fas fa-building"
                        onStateChange={handleInputChange("empresa")}
                      />
                      <Input
                        id="tiktok"
                        label="Link de TikTok"
                        type="url"
                        required
                        placeholder="https://www.tiktok.com/@usuario_tiktok"
                        icon="fab fa-tiktok"
                        onStateChange={handleInputChange("tiktok")}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        required
                        className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        onChange={(e) =>
                          setFormData({ ...formData, terms: e.target.checked })
                        }
                      />
                      <label
                        htmlFor="terms"
                        className="ml-2 text-sm text-gray-600"
                      >
                        Acepto los{" "}
                        <a
                          href="#"
                          className="text-purple-600 hover:text-purple-700 font-medium"
                        >
                          términos y condiciones
                        </a>
                        y la{" "}
                        <a
                          href="#"
                          className="text-purple-600 hover:text-purple-700 font-medium"
                        >
                          política de privacidad
                        </a>
                      </label>
                    </div>
                    <Button type="submit" fullWidth disabled={loading}>
                      {loading ? (
                        <>
                          <div className="loading-spinner"></div>
                          Creando cuenta...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-user-plus"></i>
                          Crear Cuenta
                        </>
                      )}
                    </Button>
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm mt-4">Error: {error}</p>
                  )}
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
