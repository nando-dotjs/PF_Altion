import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import './register.css'
import './Table.css';
import React from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

const Terms = () => {

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
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="cabezal"><strong>Términos y condiciones</strong></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <div>
                        <Container>
                            <h3><strong>¡Bienvenido a Unidos por la Clasificación!</strong></h3>
                            <p> Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de Unidos por la Clasificación, ubicado en </p>
                            <p><strong>http://unidosporlaclasificacion.com/</strong></p>
                            <p>Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones. No continúes usando Unidos por la Clasificación si no estás de acuerdo con todos los términos
                                y condiciones establecidos en esta página.</p>
                            <h4><strong>Cookies:</strong></h4>
                            <p>El sitio web utiliza cookies para ayudar a personalizar tu experiencia en línea. Al acceder a Unidos por la Clasificación, aceptaste utilizar las cookies necesarias.</p>
                            <p>Una cookie es un archivo de texto que un servidor de páginas web coloca en tu disco duro. Las cookies no se pueden utilizar para ejecutar programas o enviar virus a tu computadora.
                                Las cookies se te asignan de forma exclusiva y solo un servidor web en el dominio que emitió la cookie puede leerlas.</p>
                            <p>Podemos utilizar cookies para recopilar, almacenar y rastrear información con fines estadísticos o de marketing para operar nuestro sitio web. Tienes la capacidad de
                                aceptar o rechazar cookies opcionales. Hay algunas cookies obligatorias que son necesarias para el funcionamiento de nuestro sitio web. Estas cookies no requieren tu
                                consentimiento ya que siempre funcionan. Ten en cuenta que al aceptar las cookies requeridas, también aceptas las cookies de terceros, que podrían usarse a través de
                                servicios proporcionados por terceros si utilizas dichos servicios en nuestro sitio web, por ejemplo, una ventana de visualización de video proporcionada por terceros e
                                integrada en nuestro sitio web.</p>
                            <h4><strong>Licencia:</strong></h4>
                            <p>A menos que se indique lo contrario, Unidos por la Clasificación y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material en Unidos por la Clasificación.
                                Todos los derechos de propiedad intelectual son reservados. Puedes acceder desde Unidos por la Clasificación para tu uso personal sujeto a las restricciones establecidas en estos
                                términos y condiciones.</p>
                            <h4><strong>No debes:</strong></h4>
                            <p>Copiar o volver a publicar material de Unidos por la Clasificación
                                Vender, alquilar o sublicenciar material de Unidos por la Clasificación
                                Reproducir, duplicar o copiar material de Unidos por la Clasificación
                                Redistribuir contenido de Unidos por la Clasificación
                                Este acuerdo comenzará el fecha presente.</p>
                            <p>Partes de este sitio web ofrecen a los usuarios la oportunidad de publicar e intercambiar opiniones e información en determinadas áreas. Unidos por la Clasificación no filtra, edita,
                                publica ni revisa los comentarios antes de su presencia en el sitio web. Los comentarios no reflejan los puntos de vista ni las opiniones de Unidos por la Clasificación, sus agentes y/o afiliados.
                                Los comentarios reflejan los puntos de vista y opiniones de la persona que publica. En la medida en que lo permitan las leyes aplicables, Unidos por la Clasificación no será responsable de los
                                comentarios ni de ninguna responsabilidad, daños o gastos causados ​​o sufridos como resultado de cualquier uso o publicación o apariencia de comentarios en este sitio web.</p>
                            <p>Unidos por la Clasificación se reserva el derecho de monitorear todos los comentarios y eliminar los que puedan considerarse inapropiados, ofensivos o que incumplan estos Términos y Condiciones.</p>
                            <h4><strong>Garantizas y declaras que:</strong></h4>
                            <p>Tienes derecho a publicar comentarios en nuestro sitio web y tienes todas las licencias y consentimientos necesarios para hacerlo;
                                Los comentarios no invaden ningún derecho de propiedad intelectual, incluidos, entre otros, los derechos de autor, patentes o marcas comerciales de terceros;
                                Los comentarios no contienen ningún material difamatorio, calumnioso, ofensivo, indecente o ilegal de otro modo, que sea una invasión de la privacidad.
                                Los comentarios no se utilizarán para solicitar o promover negocios o actividades comerciales personalizadas o presentes o actividades ilegales.
                                Por la presente, otorgas a Unidos por la Clasificación una licencia no exclusiva para usar, reproducir, editar y autorizar a otros a usar, reproducir y editar cualquiera de tus comentarios en todas y cada una de las formas, formatos, o medios.</p>
                            <h4><strong>Hipervínculos a nuestro contenido:</strong></h4>
                            <p>Las siguientes organizaciones pueden vincularse a nuestro sitio web sin aprobación previa por escrito:</p>
                            <p>Agencias gubernamentales</p>
                            <p>Motores de búsqueda</p>
                            <p>Organizaciones de noticias</p>
                            <p>Los distribuidores de directorios en línea pueden vincularse a nuestro sitio web de la misma manera que hacen hipervínculos a los sitios web de otras empresas que figuran en la lista; y
                                Empresas acreditadas en todo el sistema, excepto que soliciten organizaciones sin fines de lucro, centros comerciales de caridad y grupos de recaudación de fondos de caridad que no pueden hacer hipervínculos a nuestro sitio web.
                                Estas organizaciones pueden enlazar a nuestra página de inicio, a publicaciones o a otra información del sitio siempre que el enlace: (a) no sea engañoso de ninguna manera; (b) no implique falsamente patrocinio, respaldo o aprobación de la parte vinculante y sus productos y/o servicios;
                                y (c) encaja en el contexto del sitio de la parte vinculante.</p>
                            <p>Podemos considerar y aprobar otras solicitudes de enlaces de los siguientes tipos de organizaciones:</p>
                            <p>fuentes de información de consumidores y/o empresas comúnmente conocidas;
                                sitios de la comunidad .com</p>
                            <p>asociaciones u otros grupos que representan organizaciones benéficas;
                                distribuidores de directorios en línea</p>
                            <p>portales de Internet</p>
                            <p>firmas de contabilidad, derecho y consultoría; y
                                instituciones educativas y asociaciones comerciales.</p>
                            <p>Aprobaremos las solicitudes de enlace de estas organizaciones si: (a) el enlace no nos haría vernos desfavorablemente a nosotros mismos ni a nuestras empresas acreditadas; (b) la organización no tiene registros negativos con nosotros; (c) el beneficio para nosotros de la visibilidad del
                                hipervínculo compensa la ausencia de Unidos por la Clasificación; y (d) el enlace está en el contexto de información general de recursos.</p>
                            <p>Estas organizaciones pueden enlazar a nuestra página de inicio siempre que el enlace: (a) no sea engañoso de ninguna manera; (b) no implique falsamente patrocinio, respaldo o aprobación de la parte vinculante y sus productos o servicios; y (c) encaja en el contexto del sitio de la parte vinculante.</p>
                            <p>Si eres una de las organizaciones enumeradas en el párrafo 2 y estás interesada en vincularte a nuestro sitio web, debes informarnos enviando un correo electrónico a Unidos por la Clasificación. Incluye tu nombre, el nombre de tu organización, la información de contacto, así como la URL de tu sitio, una lista de las URL desde las que tienes la intención de vincular a nuestro sitio web y una lista de las URL de nuestro sitio a las que te gustaría acceder. Espera 2-3 semanas para recibir una respuesta.</p>
                            <p>Las organizaciones aprobadas pueden hacer hipervínculos a nuestro sitio web de la siguiente manera:
                            </p>
                            <p>Mediante el uso de nuestro nombre corporativo; o
                                Mediante el uso del localizador uniforme de recursos al que se está vinculando; o
                                Usar cualquier otra descripción de nuestro sitio web al que está vinculado que tenga sentido dentro del contexto y formato del contenido en el sitio de la parte vinculante.
                                No se permitirá el uso del logotipo de Unidos por la Clasificación u otro material gráfico para vincular sin un acuerdo de licencia de marca comercial.</p>
                            <h4><strong>Responsabilidad del contenido:</strong></h4>
                            <p>No seremos responsables de ningún contenido que aparezca en tu sitio web. Aceptas protegernos y defendernos contra todas las reclamaciones que se presenten en tu sitio web. Ningún enlace(s) debe aparecer en ningún sitio web que pueda interpretarse como difamatorio, obsceno o criminal, o que infrinja, de otra manera viole o defienda la infracción u otra violación de los derechos de terceros.</p>
                            <h4><strong>Reserva de derechos:</strong></h4>
                            <p>Nos reservamos el derecho de solicitar que elimines todos los enlaces o cualquier enlace en particular a nuestro sitio web. Apruebas eliminar de inmediato todos los enlaces a nuestro sitio web cuando se solicite. También nos reservamos el derecho de modificar estos términos y condiciones y su política de enlaces en cualquier momento. Al vincular continuamente a nuestro sitio web, aceptas estar vinculado y seguir estos términos y condiciones de vinculación.</p>
                            <h4><strong>Eliminación de enlaces de nuestro sitio web:</strong></h4>
                            <p>Si encuentras algún enlace en nuestro sitio que sea ofensivo por cualquier motivo, puedes contactarnos e informarnos en cualquier momento. Consideraremos las solicitudes para eliminar enlaces, pero no estamos obligados a hacerlo ni a responder directamente.
                            </p>
                            <p>No nos aseguramos de que la información de este sitio web sea correcta. No garantizamos su integridad o precisión, ni prometemos asegurarnos de que el sitio web permanezca disponible o que el material en el sitio se mantenga actualizado.</p>
                            <h4><strong>Exención de responsabilidad:</strong></h4>
                            <p>En la medida máxima permitida por la ley aplicable, excluimos todas las representaciones, garantías y condiciones relacionadas con nuestro sitio web y el uso de este. Nada en este descargo de responsabilidad:</p>
                            <p>limitará o excluirá nuestra responsabilidad o la tuya por muerte o lesiones personales;</p>
                            <p>limitará o excluirá nuestra responsabilidad o la tuya por fraude o tergiversación fraudulenta;</p>
                            <p>limitará cualquiera de nuestras responsabilidades o las tuyas de cualquier manera que no esté permitida por la ley aplicable; o
                                excluirá cualquiera de nuestras responsabilidades o las tuyas que no puedan estar excluidas según la ley aplicable.</p>
                            <p>Las limitaciones y prohibiciones de responsabilidad establecidas en esta sección y en otras partes de este descargo de responsabilidad: (a) están sujetas al párrafo anterior; y (b) regirá todas las responsabilidades que surjan en virtud de la exención de responsabilidad, incluidas las responsabilidades que surjan en el contrato, en agravio y por incumplimiento de la obligación legal.</p>
                            <p>Siempre que el sitio web y la información y los servicios en el sitio se proporcionen de forma gratuita, no seremos responsables de ninguna pérdida o daño de cualquier naturaleza.</p>

                        </Container>
                    </div>
                </Container>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>

    )
}

export default Terms