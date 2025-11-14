/**
 * APLICAR ORGANIZACIÓN - Reemplaza PHOTOS/ con la versión organizada de forma segura
 */

const fs = require('fs');
const path = require('path');

class OrganizationApplier {
    constructor() {
        this.photosPath = path.join(__dirname, 'PHOTOS');
        this.backupPath = path.join(__dirname, 'PHOTOS_BACKUP');
        this.organizedPath = path.join(__dirname, 'PHOTOS_ORGANIZED_V2');
    }

    /**
     * Crea backup de la carpeta original
     */
    createBackup() {
        console.log('📦 Creando backup de PHOTOS/...');
        
        if (fs.existsSync(this.backupPath)) {
            console.log('   ⚠️  El backup ya existe, eliminando...');
            fs.rmSync(this.backupPath, { recursive: true, force: true });
        }
        
        // Copiar PHOTOS a PHOTOS_BACKUP
        this.copyDirectory(this.photosPath, this.backupPath);
        console.log('   ✅ Backup creado en PHOTOS_BACKUP/\n');
    }

    /**
     * Copia directorio recursivamente
     */
    copyDirectory(src, dest) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        
        const entries = fs.readdirSync(src, { withFileTypes: true });
        
        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);
            
            if (entry.isDirectory()) {
                this.copyDirectory(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }

    /**
     * Aplica la organización
     */
    apply() {
        console.log('🚀 APLICANDO ORGANIZACIÓN');
        console.log('='.repeat(60));
        
        // Verificar que existe la carpeta organizada
        if (!fs.existsSync(this.organizedPath)) {
            console.error('❌ No se encontró PHOTOS_ORGANIZED_V2/');
            console.error('   Ejecuta primero: node organize-products-v2.js');
            return;
        }
        
        // Crear backup
        this.createBackup();
        
        // Eliminar PHOTOS original
        console.log('🗑️  Eliminando PHOTOS/ original...');
        if (fs.existsSync(this.photosPath)) {
            fs.rmSync(this.photosPath, { recursive: true, force: true });
        }
        console.log('   ✅ PHOTOS/ eliminada\n');
        
        // Renombrar PHOTOS_ORGANIZED_V2 a PHOTOS
        console.log('📁 Aplicando nueva estructura...');
        fs.renameSync(this.organizedPath, this.photosPath);
        console.log('   ✅ Nueva estructura aplicada\n');
        
        console.log('✨ ¡Organización aplicada exitosamente!');
        console.log('\n📋 Resumen:');
        console.log(`   ✅ Backup guardado en: ${this.backupPath}`);
        console.log(`   ✅ Nueva estructura en: ${this.photosPath}`);
        console.log('\n💡 Si necesitas restaurar el backup:');
        console.log('   1. Elimina PHOTOS/');
        console.log('   2. Renombra PHOTOS_BACKUP/ a PHOTOS/');
    }
}

// Ejecutar
if (require.main === module) {
    const applier = new OrganizationApplier();
    applier.apply();
}

module.exports = OrganizationApplier;

