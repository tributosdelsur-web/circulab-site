#!/bin/bash
# ═══════════════════════════════════════════════════════
# OLIVIA CIRCULAB · MASTER UPDATE SCRIPT v3
# 18 scripts · 1 build · 1 deploy
# Ejecutar desde: ~/Desktop/circulab-site
# Uso: bash olivia_scripts/master.sh
# ═══════════════════════════════════════════════════════

echo ""
echo "🌿 OLIVIA CIRCULAB · MASTER UPDATE v3"
echo "══════════════════════════════════════"
echo ""
echo "18 scripts · 1 build · 1 deploy"
echo ""

if [ ! -f "package.json" ]; then
  echo "❌ Error: ejecuta desde ~/Desktop/circulab-site"
  exit 1
fi

echo "══════════════════════════════════════"
echo "PASO 0 · SUPABASE (manual primero)"
echo "══════════════════════════════════════"
echo ""
echo "SQL Editor → ejecutar:"
echo ""
echo "  ALTER TABLE postulaciones ENABLE ROW LEVEL SECURITY;"
echo "  CREATE POLICY allow_all ON postulaciones FOR ALL USING (true) WITH CHECK (true);"
echo ""
echo "Authentication → URL Configuration:"
echo "  Site URL: https://oliviacirculab.com.ar"
echo "  Redirect URLs:"
echo "  · https://oliviacirculab.com.ar/auth/callback"
echo "  · https://oliviacirculab.com.ar/reset-password"
echo ""
echo "Authentication → Email Templates → Reset Password:"
echo "  Verificar que el link apunta a:"
echo "  https://oliviacirculab.com.ar/auth/callback"
echo ""
read -p "¿Ya ejecutaste los cambios en Supabase? (s/n): " confirm
if [ "$confirm" != "s" ]; then
  echo "⏸️  Ejecuta los cambios en Supabase primero y volvé a correr este script"
  exit 0
fi

echo ""
echo "══════════════════════════════════════"
echo "BLOQUE 1 · SITIO + DOCUMENTOS"
echo "══════════════════════════════════════"
echo ""

echo "PASO 01 · Footer unificado..."
node olivia_scripts/fix_01_footer_component.js
if [ $? -ne 0 ]; then echo "❌ Error paso 01"; exit 1; fi

echo "PASO 02 · Defaults color + logo..."
node olivia_scripts/fix_02_defaults_logo.js
if [ $? -ne 0 ]; then echo "❌ Error paso 02"; exit 1; fi

echo "PASO 03 · Landing badges + B2B..."
node olivia_scripts/fix_03_landing.js
if [ $? -ne 0 ]; then echo "❌ Error paso 03"; exit 1; fi

echo "PASO 04 · Ciudadano última milla + RSE..."
node olivia_scripts/fix_04_ciudadano.js
if [ $? -ne 0 ]; then echo "❌ Error paso 04"; exit 1; fi

echo "PASO 05 · Institucional grandes emisores..."
node olivia_scripts/fix_05_institucional.js
if [ $? -ne 0 ]; then echo "❌ Error paso 05"; exit 1; fi

echo "PASO 06 · Simulador consorcio destacado..."
node olivia_scripts/fix_06_simulador.js
if [ $? -ne 0 ]; then echo "❌ Error paso 06"; exit 1; fi

echo "PASO 07 · One Pager gate al entrar + PDF..."
node olivia_scripts/fix_07_onepager.js
if [ $? -ne 0 ]; then echo "❌ Error paso 07"; exit 1; fi

echo "PASO 08 · Whitepaper riesgos Verra + PDF..."
node olivia_scripts/fix_08_whitepaper.js
if [ $? -ne 0 ]; then echo "❌ Error paso 08"; exit 1; fi

echo ""
echo "══════════════════════════════════════"
echo "BLOQUE 2 · ADMIN MOTOR"
echo "══════════════════════════════════════"
echo ""

echo "PASO 09 · Admin motor 12 tabs + campañas..."
node olivia_scripts/fix_09_admin_motor.js
if [ $? -ne 0 ]; then echo "❌ Error paso 09"; exit 1; fi

echo ""
echo "══════════════════════════════════════"
echo "BLOQUE 3 · INVERSORES"
echo "══════════════════════════════════════"
echo ""

echo "PASO 10 · SAFE + milestones flexibles..."
node olivia_scripts/fix_10_inversion.js
if [ $? -ne 0 ]; then echo "❌ Error paso 10"; exit 1; fi

echo "PASO 11 · Nomenclatura Circulab/OLIVIA/Metamorfosis..."
node olivia_scripts/fix_11_nomenclatura.js
if [ $? -ne 0 ]; then echo "❌ Error paso 11"; exit 1; fi

echo "PASO 12 · Contratos mandato + smart contract..."
node olivia_scripts/fix_12_contratos.js
if [ $? -ne 0 ]; then echo "❌ Error paso 12"; exit 1; fi

echo "PASO 13 · Proyecciones ROI + break-even..."
node olivia_scripts/fix_13_proyecciones.js
if [ $? -ne 0 ]; then echo "❌ Error paso 13"; exit 1; fi

echo ""
echo "══════════════════════════════════════"
echo "BLOQUE 4 · INFRAESTRUCTURA"
echo "══════════════════════════════════════"
echo ""

echo "PASO 14 · SEO meta tags OG favicon sitemap robots..."
node olivia_scripts/fix_14_seo.js
if [ $? -ne 0 ]; then echo "❌ Error paso 14"; exit 1; fi

echo "PASO 15 · Privacidad + Fix olvidé contraseña + Checkbox T&C..."
node olivia_scripts/fix_15_privacidad_auth.js
if [ $? -ne 0 ]; then echo "❌ Error paso 15"; exit 1; fi

echo "PASO 16 · Página Metamorfosis completa..."
node olivia_scripts/fix_16_metamorfosis.js
if [ $? -ne 0 ]; then echo "❌ Error paso 16"; exit 1; fi

echo "PASO 17 · Onboarding + email bienvenida automático..."
node olivia_scripts/fix_17_onboarding_email.js
if [ $? -ne 0 ]; then echo "❌ Error paso 17"; exit 1; fi

echo "PASO 18 · Términos con cláusula 8 + página Equipo..."
node olivia_scripts/fix_18_terminos_equipo.js
if [ $? -ne 0 ]; then echo "❌ Error paso 18"; exit 1; fi

echo ""
echo "══════════════════════════════════════"
echo "BUILD"
echo "══════════════════════════════════════"
echo ""

npm run build 2>&1 | tail -15

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ Build falló · revisar errores arriba"
  echo "   Ejecuta: npm run build 2>&1 | head -80"
  exit 1
fi

echo ""
echo "══════════════════════════════════════"
echo "DEPLOY"
echo "══════════════════════════════════════"
echo ""

git add -A && \
git commit -m "feat: master update v3 completo · 18 scripts · footer unificado · SEO · meta tags · OG · favicon · sitemap · nomenclatura Circulab-OLIVIA-Metamorfosis · página /metamorfosis · /terminos cláusula 8 mandato · /privacidad Ley 25.326 · /equipo · /reset-password · email bienvenida automático Resend · onboarding mejorado · SAFE milestones flexibles · proyecciones ROI · admin 12 tabs campañas · motor automatización completo" && \
git push && \
npx vercel --prod

echo ""
echo "══════════════════════════════════════"
echo "✅ OLIVIA MASTER UPDATE v3 COMPLETADO"
echo "══════════════════════════════════════"
echo ""
echo "URLs a verificar:"
echo "  oliviacirculab.com.ar"
echo "  oliviacirculab.com.ar/ciudadano"
echo "  oliviacirculab.com.ar/institucional"
echo "  oliviacirculab.com.ar/metamorfosis  ← NUEVA"
echo "  oliviacirculab.com.ar/equipo         ← NUEVA"
echo "  oliviacirculab.com.ar/terminos       ← ACTUALIZADA"
echo "  oliviacirculab.com.ar/privacidad     ← NUEVA"
echo "  oliviacirculab.com.ar/reset-password ← NUEVA"
echo "  oliviacirculab.com.ar/admin          ← 12 tabs"
echo ""
echo "PENDIENTES MANUALES POST-DEPLOY:"
echo ""
echo "  1. Crear og-image.png (1200x630) en Canva"
echo "     Subir a public/og-image.png"
echo ""
echo "  2. Resend.com:"
echo "     · Crear cuenta gratuita"
echo "     · Verificar dominio oliviacirculab.com.ar"
echo "     · Copiar API key"
echo "     · Agregar RESEND_API_KEY en .env.local"
echo "     · Agregar RESEND_API_KEY en Vercel Settings"
echo ""
echo "  3. Cargar fondos: node cargar_fondos.js"
echo ""
echo "  4. Testear flujo completo:"
echo "     Registro → email bienvenida → dashboard"
echo "     Olvidé contraseña → email reset → nueva pass"
echo ""
echo "  5. Cargar primeros leads en Admin → Investor CRM"
echo ""
echo "  6. Registrar sitio en Google Search Console"
echo "     Agregar el ID en app/layout.tsx"
echo "     verification.google: 'tu-id'"
echo ""
