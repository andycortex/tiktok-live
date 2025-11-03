const { WebcastPushConnection } = require('tiktok-live-connector');
const db = require('./db');

const activeConnections = new Map();

/**
 * Inicia el scraping para un usuario de TikTok.
 * @param {string} username El nombre de usuario de TikTok.
 */
function startScraping(username) {
    return new Promise((resolve, reject) => {
        if (activeConnections.has(username)) {
            return reject(new Error(`El scraping para "${username}" ya está activo.`));
        }

        let tiktokConnection = new WebcastPushConnection(username);

        tiktokConnection.connect().then(state => {
            console.log(`✅ Conectado al Live de @${username} (ID de Sala: ${state.roomId})`);
            
            activeConnections.set(username, tiktokConnection);
            resolve(state);

        }).catch(err => {
            console.error(`❌ Fallo al conectar. Asegúrate de que @${username} esté EN VIVO. Error: ${err}`);
            reject(err);
        });

        tiktokConnection.on('chat', data => {
            console.log(`💬 [${username}] ${data.nickname}: ${data.comment}`);
            db.insertComment(username, data.uniqueId, data.nickname, data.comment)
                .catch(err => console.error('❌ Error al guardar el comentario:', err));
        });

        tiktokConnection.on('disconnected', reason => {
            console.log(`🛑 Desconectado del Live de @${username}. Razón: ${reason}`);
            activeConnections.delete(username); 
        });

        tiktokConnection.on('error', err => {
            console.error(`❌ Error en la conexión con @${username}:`, err);
            activeConnections.delete(username); 
        });
    });
}

/**
 * Detiene el scraping para un usuario de TikTok.
 * @param {string} username El nombre de usuario de TikTok.
 */
function stopScraping(username) {
    return new Promise((resolve, reject) => {
        const tiktokConnection = activeConnections.get(username);

        if (!tiktokConnection) {
            return reject(new Error(`No se encontró una conexión activa para "${username}".`));
        }

        tiktokConnection.disconnect();
        activeConnections.delete(username);
        console.log(`🔌 Conexión con @${username} terminada.`);
        resolve();
    });
}

/**
 * Detiene todas las conexiones activas.
 */
function stopAllScraping() {
    return new Promise((resolve) => {
        console.log('🚨 Deteniendo todas las conexiones de scraping...');
        for (const username of activeConnections.keys()) {
            stopScraping(username).catch(err => console.error(err.message));
        }
        resolve();
    });
}

module.exports = {
    startScraping,
    stopScraping,
    stopAllScraping,
    activeConnections
};
