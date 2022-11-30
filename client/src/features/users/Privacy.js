import React from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';

const Privacy = () => {

    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(true)
        navigate(-1);
    };


    return (
        <Modal
            show={!show}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"

            centered

        >
            <Modal.Header closeButton>
                <Modal.Title id="cabezal"><strong>Política de privacidad de la UPC</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>


                <Container>

                    <div>

                        <Container>


                            <h3><strong>Política de privacidad</strong></h3>
                            <p>Última actualización: 29 de noviembre de 2022</p>
                            <br />
                            <p>Esta Política de privacidad describe Nuestras políticas y procedimientos sobre la recopilación,
                                el uso y la divulgación de Su información cuando utiliza el Servicio y le informa sobre Sus derechos de privacidad y cómo la ley lo protege.</p>
                            <p>Usamos sus datos personales para proporcionar y mejorar el Servicio. Al usar el Servicio, acepta la recopilación y el uso de información de
                                acuerdo con esta Política de privacidad. Esta Política de Privacidad ha sido creada con la ayuda del Generador de Políticas de Privacidad .</p>
                            <p></p>
                            <p></p>
                            <p></p>
                            <h2><strong>Interpretación y Definiciones</strong></h2>
                            <h3><strong>Interpretación</strong></h3>
                            <p>Las palabras cuya letra inicial está en mayúscula tienen significados definidos bajo las siguientes condiciones. Las siguientes definiciones
                                tendrán el mismo significado independientemente de que aparezcan en singular o en plural.</p>
                            <h3><strong>Definiciones</strong></h3>
                            <p>A los efectos de esta Política de Privacidad:</p>
                            <p><strong>Cuenta</strong> significa una cuenta única creada para que Usted acceda a nuestro Servicio o partes de nuestro Servicio.</p>
                            <p><strong>La compañia</strong> (referida como "la Compañía", "Nosotros", "Nos" o "Nuestro" en este Acuerdo) se refiere a Altion, Uruguay.</p>
                            <p><strong>Las cookies</strong> son pequeños archivos que un sitio web coloca en su computadora, dispositivo móvil o cualquier otro dispositivo,
                                y que contienen los detalles de su historial de navegación en ese sitio web entre sus muchos usos.</p>
                            <p><strong>País</strong> se refiere a: Uruguay</p>
                            <p><strong>Dispositivo</strong> significa cualquier dispositivo que pueda acceder al Servicio, como una computadora, un teléfono celular o una tableta digital.</p>
                            <p><strong>Los datos personales</strong> son cualquier información que se relaciona con un individuo identificado o identificable.</p>
                            <p><strong>Servicio</strong> se refiere al sitio web.</p>
                            <p><strong>Proveedor de servicios</strong> significa cualquier persona física o jurídica que procesa los datos en nombre de la Compañía. Se refiere a empresas de terceros
                                o personas empleadas por la Empresa para facilitar el Servicio, proporcionar el Servicio en nombre de la Empresa, realizar servicios relacionados con el
                                Servicio o ayudar a la Empresa a analizar cómo se utiliza el Servicio.</p>
                            <p><strong>Los Datos de uso</strong> se refieren a los datos recopilados automáticamente, ya sea generados por el uso del Servicio o por la propia infraestructura del Servicio
                                (por ejemplo, la duración de una visita a la página).</p>
                            <p><strong>El sitio web</strong> hace referencia a la UPC, accesible desde www.unidosporlaclasificacion.com</p>
                            <p><strong>Usted se refiere</strong> a la persona que accede o utiliza el Servicio, o la empresa u otra entidad legal en nombre de la cual dicha persona accede o utiliza el Servicio,
                                según corresponda.</p>
                            <br />
                            <h2><strong>Recopilación y uso de sus datos personales</strong></h2>
                            <h3><strong>Tipos de datos recopilados</strong></h3>
                            <h4><strong>Información personal</strong></h4>
                            <p>Mientras usa Nuestro Servicio, podemos pedirle que nos proporcione cierta información de identificación personal que se puede usar para contactarlo o identificarlo. La información
                                de identificación personal puede incluir, entre otros:</p>
                            <p>Dirección de correo electrónico</p>
                            <p>Nombre y apellido</p>
                            <p>Número de teléfono</p>
                            <p>Dirección, estado, provincia, código postal, ciudad</p>
                            <p>Datos de uso</p>
                            <br />
                            <h4><strong>Datos de uso</strong></h4>
                            <p>Los Datos de uso se recopilan automáticamente cuando se utiliza el Servicio.</p>

                            <p> Los datos de uso pueden incluir información como la dirección del protocolo de Internet de su dispositivo
                                (por ejemplo, la dirección IP), el tipo de navegador, la versión del navegador, las páginas de nuestro Servicio que visita,
                                la hora y la fecha de su visita, el tiempo dedicado a esas páginas, dispositivo único identificadores y otros datos de diagnóstico.</p>

                            <p> Cuando accede al Servicio a través de un dispositivo móvil, podemos recopilar cierta información automáticamente, que incluye, entre otros, el tipo de
                                dispositivo móvil que utiliza, la identificación única de su dispositivo móvil, la dirección IP de su dispositivo móvil, su sistema operativo, el tipo de navegador
                                de Internet móvil que utiliza, identificadores únicos de dispositivos y otros datos de diagnóstico.</p>

                            <p>También podemos recopilar información que su navegador envía cada vez que visita nuestro Servicio o cuando accede al Servicio a través de un dispositivo móvil.</p>


                            <h4><strong>Tecnologías de seguimiento y cookies</strong></h4>

                            <p >Usamos Cookies y tecnologías de
                                seguimiento similares para rastrear la actividad en Nuestro
                                Servicio y almacenar cierta información.

                                Las tecnologías de seguimiento
                                utilizadas son balizas, etiquetas y scripts para recopilar y
                                rastrear información y para mejorar y analizar Nuestro Servicio.

                                Las tecnologías que utilizamos
                                pueden incluir:</p>

                            <p><strong>Cookies o Cookies del Navegador.</strong> Una cookie es un pequeño archivo que se coloca en su dispositivo. Puede indicar a su navegador que rechace todas las cookies
                                o que indique cuándo se envía una cookie. Sin embargo, si no acepta las Cookies, es posible que no pueda utilizar algunas partes de nuestro Servicio.
                                A menos que haya ajustado la configuración de su navegador para que rechace las Cookies, nuestro Servicio puede usar Cookies.</p>
                            <p><strong>Balizas web.</strong> Ciertas secciones de nuestro Servicio y nuestros correos electrónicos pueden contener pequeños archivos electrónicos conocidos como balizas web
                                (también denominados gifs transparentes, etiquetas de píxeles y gifs de un solo píxel) que permiten a la Compañía, por ejemplo, contar los usuarios que han
                                visitado esas páginas. o abrió un correo electrónico y para otras estadísticas relacionadas con el sitio web (por ejemplo, registrar la popularidad de una
                                determinada sección y verificar la integridad del sistema y del servidor).</p>
                            <p>Las cookies pueden ser cookies "persistentes" o de "sesión". Las cookies persistentes permanecen en su computadora personal o dispositivo móvil cuando se desconecta, mientras
                                que las cookies de sesión se eliminan tan pronto como cierra su navegador web. Obtenga más información sobre las cookies en el artículo del sitio web Políticas de privacidad .</p>
                            <p>Utilizamos cookies de sesión y persistentes para los fines establecidos a continuación:</p>
                            <p><strong>Cookies necesarias/esenciales</strong></p>
                            <p>Tipo: Cookies de sesión</p>
                            <p>Administrado por: Nosotros</p>
                            <p>Propósito: estas cookies son esenciales para brindarle los servicios disponibles a través del sitio web y permitirle usar algunas de sus funciones. Ayudan a autenticar a los usuarios
                                y previenen el uso fraudulento de cuentas de usuario. Sin estas Cookies, no se pueden proporcionar los servicios que ha solicitado, y solo utilizamos estas Cookies para proporcionarle esos servicios.</p>
                            <p><strong>Política de Cookies / Aviso de Aceptación de Cookies</strong></p>
                            <p>Tipo: Cookies persistentes</p>
                            <p>Administrado por: Nosotros</p>
                            <p>Finalidad: Estas Cookies identifican si los usuarios han aceptado el uso de cookies en el Sitio Web.</p>
                            <p><strong>Cookies de funcionalidad</strong></p>
                            <p>Tipo: Cookies persistentes</p>
                            <p>Administrado por: Nosotros</p>
                            <p>Propósito: estas cookies nos permiten recordar las elecciones que hace cuando usa el sitio web, como recordar sus datos de inicio de sesión o su preferencia de idioma. El propósito de estas Cookies es
                                brindarle una experiencia más personal y evitar que tenga que volver a ingresar sus preferencias cada vez que use el sitio web.</p>
                            <p>Para obtener más información sobre las cookies que utilizamos y sus opciones con respecto a las cookies, visite nuestra Política de cookies o la sección Cookies de nuestra Política de privacidad.</p>
                            <h3><strong>Uso de sus datos personales</strong></h3>
                            <p>La Compañía puede utilizar los Datos Personales para los siguientes propósitos:</p>
                            <p><strong>Para proporcionar y mantener nuestro Servicio</strong> , incluso para monitorear el uso de nuestro Servicio.</p>
                            <p><strong>Para gestionar Su Cuenta:</strong> para gestionar Su registro como usuario del Servicio. Los Datos Personales que proporcione pueden darle acceso a diferentes funcionalidades del Servicio que
                                están disponibles para Usted como usuario registrado.</p>
                            <p><strong>Para la ejecución de un contrato:</strong> el desarrollo, cumplimiento y realización del contrato de compra de los productos, artículos o servicios que haya adquirido o de cualquier otro contrato
                                con Nosotros a través del Servicio.</p>
                            <p><strong>Para contactarlo:</strong> para contactarlo por correo electrónico, llamadas telefónicas, SMS u otras formas equivalentes de comunicación electrónica, como notificaciones automáticas de una aplicación
                                móvil sobre actualizaciones o comunicaciones informativas relacionadas con las funcionalidades, productos o servicios contratados, incluidas las actualizaciones de seguridad, cuando sea necesario
                                o razonable para su implementación.</p>
                            <p><strong>Para proporcionarle noticias, </strong> ofertas especiales e información general sobre otros bienes, servicios y eventos que ofrecemos que son similares a los que ya compró o preguntó, a menos que haya
                                optado por no recibir dicha información.</p>
                            <p><strong>Para gestionar Sus solicitudes:</strong> Para atender y gestionar Sus solicitudes hacia Nosotros.</p>
                            <p><strong>Para transferencias comerciales:</strong> podemos usar su información para evaluar o realizar una fusión, venta, reestructuración, reorganización, disolución u otra venta o transferencia de algunos o todos
                                nuestros activos, ya sea como una empresa en marcha o como parte de una quiebra, liquidación, o procedimiento similar, en el que los Datos personales que tenemos sobre los usuarios de nuestro Servicio
                                se encuentran entre los activos transferidos.</p>
                            <p><strong>Para otros fines</strong>: podemos utilizar su información para otros fines, como el análisis de datos, la identificación de tendencias de uso, la determinación de la eficacia de nuestras campañas promocionales y
                                para evaluar y mejorar nuestro Servicio, productos, servicios, marketing y su experiencia.</p>
                            <p>Podemos compartir su información personal en las siguientes situaciones:</p>
                            <p><strong>Con proveedores de servicios</strong>: Podemos compartir Su información personal con Proveedores de Servicios para monitorear y analizar el uso de nuestro Servicio, para contactarlo.</p>
                            <p><strong>Para transferencias comerciales</strong>: Podemos compartir o transferir Su información personal en relación con, o durante las negociaciones de, cualquier fusión, venta de activos de la Compañía, financiamiento o
                                adquisición de todo o una parte de Nuestro negocio a otra compañía.</p>
                            <p><strong>Con afiliados</strong>: podemos compartir su información con nuestros afiliados, en cuyo caso exigiremos a esos afiliados que respeten esta Política de privacidad. Los afiliados incluyen nuestra empresa matriz y
                                cualquier otra subsidiaria, socios de empresas conjuntas u otras empresas que controlamos o que están bajo control común con nosotros.</p>
                            <p><strong>Con socios comerciales</strong>: Podemos compartir Su información con Nuestros socios comerciales para ofrecerle ciertos productos, servicios o promociones.</p>
                            <p><strong>Con otros usuarios</strong>: cuando comparte información personal o interactúa en las áreas públicas con otros usuarios, dicha información puede ser vista por todos los usuarios y puede distribuirse públicamente al exterior.</p>
                            <p><strong>Con su consentimiento</strong>: podemos divulgar su información personal para cualquier otro propósito con su consentimiento.</p>
                            <h3><strong>Retención de sus datos personales</strong></h3>
                            <p>La Compañía conservará sus Datos personales solo durante el tiempo que sea necesario para los fines establecidos en esta Política de privacidad. Conservaremos y utilizaremos sus datos personales en la medida necesaria para cumplir con
                                nuestras obligaciones legales (por ejemplo, si estamos obligados a conservar sus datos para cumplir con las leyes aplicables), resolver disputas y hacer cumplir nuestros acuerdos y políticas legales.</p>
                            <p>La Compañía también conservará los Datos de uso para fines de análisis interno. Los Datos de uso generalmente se retienen por un período de tiempo más corto, excepto cuando estos datos se utilizan para fortalecer la seguridad o mejorar la funcionalidad
                                de Nuestro Servicio, o cuando estamos legalmente obligados a retener estos datos por períodos de tiempo más largos.</p>
                            <h3><strong>Transferencia de sus datos personales</strong></h3>
                            <p>Su información, incluidos los Datos personales, se procesa en las oficinas operativas de la Compañía y en cualquier otro lugar donde se encuentren las partes involucradas en el procesamiento. Significa que esta información puede transferirse y mantenerse en computadoras
                                ubicadas fuera de Su estado, provincia, país u otra jurisdicción gubernamental donde las leyes de protección de datos pueden diferir de las de Su jurisdicción.</p>
                            <p>Su consentimiento a esta Política de privacidad seguido de Su envío de dicha información representa Su acuerdo con esa transferencia.</p>
                            <p>La Compañía tomará todas las medidas razonablemente necesarias para garantizar que sus datos se traten de forma segura y de acuerdo con esta Política de privacidad y no se realizará ninguna transferencia de sus datos personales a una organización o país, a
                                menos que existan controles adecuados establecidos, incluida la seguridad de Sus datos y otra información personal.</p>
                            <h3><strong>Eliminar sus datos personales</strong></h3>
                            <p>Tiene derecho a eliminar o solicitar que lo ayudemos a eliminar los Datos personales que hemos recopilado sobre usted.</p>
                            <p>Nuestro Servicio puede darle la capacidad de eliminar cierta información sobre Usted dentro del Servicio.</p>
                            <p>Puede actualizar, modificar o eliminar su información en cualquier momento iniciando sesión en su cuenta, si tiene una, y visitando la sección de configuración de la cuenta que le permite administrar su información personal. También puede comunicarse con nosotros para
                                solicitar acceso, corregir o eliminar cualquier información personal que nos haya proporcionado.</p>
                            <p>Sin embargo, tenga en cuenta que es posible que necesitemos conservar cierta información cuando tengamos una obligación legal o una base legal para hacerlo.</p>
                            <h3><strong>Divulgación de sus datos personales</strong></h3>
                            <h4><strong>Transacciones de negocios</strong></h4>
                            <p>Si la Compañía está involucrada en una fusión, adquisición o venta de activos, Sus Datos personales pueden transferirse. Le enviaremos un aviso antes de que sus Datos personales se transfieran y queden sujetos a una Política de privacidad diferente.</p>
                            <h4><strong>Cumplimiento de la ley</strong></h4>
                            <p>En determinadas circunstancias, es posible que se le solicite a la Compañía que divulgue sus Datos personales si así lo exige la ley o en respuesta a solicitudes válidas de las autoridades públicas (por ejemplo, un tribunal o una agencia gubernamental).</p>
                            <h4><strong>Otros requisitos legales</strong></h4>
                            <p>La Compañía puede divulgar sus datos personales de buena fe cuando considere que esta acción es necesaria para lo siguiente:</p>
                            <p>Cumplir con una obligación legal</p>
                            <p>Proteger y defender los derechos o propiedad de la Compañía</p>
                            <p>Prevenir o investigar posibles irregularidades en relación con el Servicio</p>
                            <p>Proteger la seguridad personal de los Usuarios del Servicio o del público</p>
                            <p>Protéjase contra la responsabilidad legal</p>
                            <h3><strong>Seguridad de sus datos personales</strong></h3>
                            <p>La seguridad de sus datos personales es importante para nosotros, pero recuerde que ningún método de transmisión por Internet o método de almacenamiento electrónico es 100 % seguro. Si bien nos esforzamos por utilizar medios comercialmente aceptables para proteger sus datos personales,
                                no podemos garantizar su seguridad absoluta.</p>
                            <h2><strong>Privacidad de los niños</strong></h2>
                            <p>Nuestro Servicio no se dirige a ninguna persona menor de 13 años. No recopilamos a sabiendas información de identificación personal de ninguna persona menor de 13 años. Si usted es un padre o tutor y sabe que su hijo nos ha proporcionado Datos personales, por favor Contáctenos.
                                Si nos damos cuenta de que hemos recopilado Datos personales de cualquier persona menor de 13 años sin verificación del consentimiento de los padres, tomamos medidas para eliminar esa información de Nuestros servidores.</p>
                            <p>Si necesitamos basarnos en el consentimiento como base legal para procesar su información y su país requiere el consentimiento de uno de sus padres, podemos solicitar el consentimiento de su padre antes de recopilar y usar esa información.</p>
                            <h2><strong>Enlaces a otros sitios web</strong></h2>
                            <p>Nuestro Servicio puede contener enlaces a otros sitios web que no son operados por Nosotros. Si hace clic en el enlace de un tercero, será dirigido al sitio de ese tercero. Le recomendamos encarecidamente que revise la Política de privacidad de cada sitio que visite.</p>
                            <p>No tenemos control ni asumimos ninguna responsabilidad por el contenido, las políticas de privacidad o las prácticas de los sitios o servicios de terceros.</p>
                            <h2><strong>Cambios a esta Política de Privacidad</strong></h2>
                            <p>Es posible que actualicemos nuestra Política de privacidad de vez en cuando. Le notificaremos cualquier cambio publicando la nueva Política de privacidad en esta página.</p>
                            <p>Le informaremos por correo electrónico y/o un aviso destacado en Nuestro Servicio, antes de que el cambio entre en vigencia y actualizaremos la fecha de "Última actualización" en la parte superior de esta Política de privacidad.</p>
                            <p>Se le recomienda revisar esta Política de Privacidad periódicamente para cualquier cambio. Los cambios a esta Política de privacidad son efectivos cuando se publican en esta página.</p>
                            <h2><strong>Contáctenos</strong></h2>
                            <p>Si tiene alguna pregunta sobre esta Política de privacidad, puede contactarnos:</p>
                            <p>Por correo electrónico: <strong>altionsolutions2022@gmail.com</strong></p>



                        </Container>
                    </div>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant="secondary" onClick={handleClose}>
                   Cancelar
        //             </Button>
        //             <Button variant="primary" onClick={onSaveUserClicked} disabled={!role || !validMail || !name || !surname ? true : false}>
        //                 Guardar cambios
        //             </Button> */}
            </Modal.Footer>
        </Modal>

    )
}

export default Privacy