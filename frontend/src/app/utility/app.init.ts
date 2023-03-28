import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
    return () =>
        keycloak.init({
            config: {
                url: 'http://localhost:8080/auth',
                realm: 'mts',
                clientId: 'mts',
            },
            loadUserProfileAtStartUp: true,
            initOptions: {
                onLoad: 'login-required',
                checkLoginIframe: true,
                checkLoginIframeInterval: 25,
                silentCheckSsoRedirectUri:
                    window.location.origin + '/assets/silent-check-sso.html',
            },
        });
}
