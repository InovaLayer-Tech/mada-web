const fs = require("fs");
const path = require("path");

const files = [
  "src/app/features/b2b-painel-engenharia/components/fila-solicitacoes/fila-solicitacoes.component.ts",
  "src/app/features/b2b-painel-engenharia/components/motor-metrologico/motor-metrologico.component.ts",
  "src/app/features/b2b-painel-engenharia/components/dashboard-auditoria/dashboard-auditoria.component.ts",
  "src/app/features/b2b-painel-engenharia/components/catalogo-insumos/catalogo-insumos.component.ts",
  "src/app/features/b2b-painel-engenharia/components/configuracoes-globais/configuracoes-globais.component.ts",
  "src/app/features/b2b-painel-engenharia/components/perfil/perfil.component.ts",
  "src/app/features/b2c-portal-cliente/components/dashboard-cliente/dashboard-cliente.component.ts",
  "src/app/features/b2c-portal-cliente/components/solicitacao-rfq/solicitacao-rfq.component.ts",
  "src/app/features/b2c-portal-cliente/components/perfil/perfil-cliente.component.ts"
];

files.forEach(f => {
   const fullPath = path.join("r:/InovaLayer 3D/inovalayer/mada-web", f);
   let content = fs.readFileSync(fullPath, "utf-8");
   
   if (!content.includes("TranslateModule")) {
       content = content.replace(/(import\s+{.*?}\s+from\s+.@angular\/core.;)/, "$1\nimport { TranslateModule } from \"@ngx-translate/core\";");
       content = content.replace(/imports:\s*\[([^\]]+)\]/, (match, p1) => {
           return "imports: [" + p1 + ", TranslateModule]";
       });
       fs.writeFileSync(fullPath, content);
       console.log("Updated " + f);
   } else {
       console.log("Skipped " + f);
   }
});
