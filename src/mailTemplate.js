import mjml2html from 'mjml';

function createHtmlFromTemplate(text, historyEntry) {
    return mjml2html(`
    <mjml>
      <mj-body>
        <mj-section>
          <mj-column>
            <mj-text 
                align="center"
                color="#000"
                font-size="12px"
                font-family="Helvetica Neue">
                    <p><strong>Nachricht</strong>:${text}.</p>
                    <p>Die Nachricht hat eine Länge von ${historyEntry.duration} Sekunden.</p>
            </mj-text>
            <mj-button background-color="#F45E43"
                href=${historyEntry.recordingUrl}>
                    Voicemail abspielen
            </mj-button>        
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `).html;
}

export default createHtmlFromTemplate;
