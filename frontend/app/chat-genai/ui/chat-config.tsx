import * as React from 'react';
import  TemporaryDrawer from '@/app/components/base-ui/drawer';
import { FormControl, TextField, InputLabel, Select, MenuItem, Switch, FormControlLabel, Stack, Container, Box, Typography, Slider } from '@mui/material';
import { ChatConfiguration } from '../lib/types';
import { chatConfigContext } from './chat-section';
import SettingsIcon from '@mui/icons-material/Settings';
import { grey } from '@mui/material/colors';

export default function ChatConfig () {
    const [openConfig, setOpenConfig] = React.useState(false);
     
    return (
            <React.Fragment>
                <SettingsIcon sx = {{ color: grey['600'] }} onClick={() => setOpenConfig(true)} className='cursor-pointer hover:bg-gray-200/75 rounded-full'/>
                <TemporaryDrawer openConfig={openConfig} setOpenConfig={setOpenConfig} content={<ChatConfigContent/>}/>
            </React.Fragment>
    )
}

function ChatConfigContent () {

    const chatConfigContextValue = React.useContext(chatConfigContext);
    if (! chatConfigContextValue ) {
        throw new Error("Chat config has not been defined. This component will not work.");
     }
    
    const { chatConfig, setChatConfig } = chatConfigContextValue;

    const onChange = (key: keyof ChatConfiguration, value: ChatConfiguration[typeof key]) =>{
        setChatConfig({...chatConfig, [key]: value})
      }

    const handleBlur = (key: keyof ChatConfiguration, value: ChatConfiguration[typeof key]) => {
        onChange(key, value);
    }

    const DataStoreId = () => {
        const [localDataStoreId, setLocalDataStoreId] = React.useState(chatConfig.DATA_STORE_ID);
        return (
                <TextField
                    id="dataStoreId"
                    label=" Data Store ID "
                    onChange={(e) => {
                        setLocalDataStoreId(e.target.value);
                    }}
                    value={localDataStoreId}
                    onBlur={() => handleBlur("DATA_STORE_ID", localDataStoreId)}
                />
        );
      }

    const DataStoreProjectId = () => {
        const [localDataStoreProjectId, setLocalDataStoreProjectId] = React.useState(chatConfig.DATA_STORE_PROJECT_ID);
        return (
                <TextField
                id="dataStoreProjectId"
                label=" Data Store Project ID "
                onChange={(e) => setLocalDataStoreProjectId(e.target.value)}
                onBlur={() => handleBlur("DATA_STORE_PROJECT_ID", localDataStoreProjectId)}
                value={localDataStoreProjectId}
                autoFocus={false}
                />
        );
    }

    const DataStoreLocation = () => {
        const [localDataStoreLocation, setLocalDataStoreLocation] = React.useState(chatConfig.DATA_STORE_LOCATION);
        return (
                <TextField
                id="dataStoreLocation"
                label=" Data Store Location "
                onChange={(e) => setLocalDataStoreLocation(e.target.value)}
                onBlur={() => handleBlur("DATA_STORE_LOCATION", localDataStoreLocation)}
                value={localDataStoreLocation}
                autoFocus={false}
                />
        );
    }

    const Model = () => {
        // const [localModel, setLocalModel] = React.useState(chatConfig.model);
        return (
            <FormControl sx={{ minWidth: "200px" }} id="model">
                <InputLabel id="demo-simple-select-label"> Model </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={chatConfig.MODEL}
                    label="Model"
                    onChange={(e) => { 
                        // setLocalModel(e.target.value);
                        onChange("MODEL", e.target.value);
                    }}
                    // onBlur={() => handleBlur("model", localModel)}
                >
                    <MenuItem value={"gemini-1.5-pro"}>gemini-1.5-pro</MenuItem>
                    <MenuItem value={"gemini-1.5-flash"}>gemini-1.5-flash</MenuItem>
                </Select>
            </FormControl>
        );
    }

    const GroundingVAI = () => {
        // const [localGrounding, setLocalGrounding] = React.useState(chatConfig.grounding);
        return (
            <FormControlLabel 
                control={
                    <Switch
                        checked={chatConfig.GROUND_VAI}
                        onChange={(e) => { 
                            // setLocalGrounding(e.target.checked);
                            onChange("GROUND_VAI", e.target.checked);
                        }}
                        // onBlur={() => handleBlur("grounding", localGrounding)}
                    />
                } 
                label="Grounding Data" 
                id="grounding"
            />
        );
      }
    
    const GroundingSearch = () => {
    // const [localGrounding, setLocalGrounding] = React.useState(chatConfig.grounding);
    return (
        <FormControlLabel 
            control={
                <Switch
                    checked={chatConfig.GROUND_SEARCH}
                    onChange={(e) => { 
                        // setLocalGrounding(e.target.checked);
                        onChange("GROUND_SEARCH", e.target.checked);
                    }}
                    // onBlur={() => handleBlur("grounding", localGrounding)}
                />
            } 
            label="Grounding Search" 
            id="grounding"
        />
    );
    }

    const Temperature = () => {
        const [localTemperature, setLocalTemperature] = React.useState(chatConfig.TEMPERATURE);
        const [sliderValue, setSliderValue] = React.useState(localTemperature);
        const [textFieldValue, setTextFieldValue] = React.useState(String(localTemperature));

        const handleTemperatureChange = (event: Event, newValue: number | number[]) => {
                setSliderValue(newValue as number);
                setTextFieldValue(String(newValue));
        };
        const handleTemperatureChangeCommited = (event: any, newValue: number | number[]) => {
                // setSliderValue(newValue as number);
                // setTextFieldValue(newValue as number);
                onChange("TEMPERATURE", newValue as number);
        };
        return (
            <>
                <Typography id="temperature" gutterBottom>
                Temperature
                </Typography>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box sx={{ width: '40%' }}>
                        <Slider
                            id="temperatureSlider"
                            aria-label="Temperature"
                            value={sliderValue}
                            onChange={handleTemperatureChange}
                            onChangeCommitted={handleTemperatureChangeCommited}
                            valueLabelDisplay="auto"
                            min={0}
                            max={1}
                            step={0.1}
                        />
                    </Box>
                    <Box sx={{ width: '40%', display: 'flex', alignItems: 'center' }}>
                    <TextField 
                        id="temperatureTextField"
                        variant="outlined" 
                        value={textFieldValue}
                        helperText={(Number(textFieldValue) < 0 || Number(textFieldValue) > 1) ? " 0 =< Temperature <= 1" : ""}
                        error={Number(textFieldValue) < 0 || Number(textFieldValue) > 1}
                        onChange={(event) => {
                            setTextFieldValue(event.target.value);
                        }} 
                        onBlur={(event) => {
                            const newValue = parseFloat(event.target.value);
                            if (!isNaN(newValue) && newValue >= 0 && newValue <= 1) {
                                setSliderValue(newValue);
                                onChange("TEMPERATURE", newValue);
                            }
                        }}
                        sx={{ mr: 2 }}
                        inputProps={{ style: { textAlign: 'center' }}}
                    />
                    </Box>
                </Box>
            </>
        );
        }
    
    const MaxTokens = () => {
        const [localMaxTokens, setLocalMaxTokens] = React.useState(chatConfig.MAX_TOKENS);
        return (
            <TextField
                id="maxTokens"
                label=" Max Tokens "
                onChange={(e) => setLocalMaxTokens(Number(e.target.value))}
                onBlur={() => handleBlur("MAX_TOKENS", localMaxTokens)}
                value={localMaxTokens}
                autoFocus={false}
            />
        );
    }

    return (
        <div>
            <Container>
                <Box paddingTop={4}>
                    <Box display="flex" justifyContent="center" paddingBottom={2}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Chat Settings
                        </Typography>
                    </Box>
                    <FormControl>
                        <Stack spacing={2}>
                            <Model />
                            <GroundingVAI />
                            {chatConfig.GROUND_VAI && 
                                <>
                                    <DataStoreId />
                                    <DataStoreProjectId />
                                    <DataStoreLocation />
                                </>  
                            }
                            <GroundingSearch />
                            <Temperature />
                            <MaxTokens />
                        </Stack>
                    </FormControl>
                </Box>
            </Container>
        </div>
    )
}


