function mySettings(props) {
    return (
      <Page>
        <Section     
          title={<Text bold align="center">K-Pay settings</Text>}> 
          <TextInput
            label="Your API key"
            settingsKey="apikey"
            type="text"
          />
        </Section>
      </Page>
    );
}
  
registerSettingsPage(mySettings);