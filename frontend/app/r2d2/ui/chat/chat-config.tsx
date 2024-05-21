import * as React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { buttonVariants } from '../button';
import { cn } from '../lib/utils';
import  TemporaryDrawer from '@/app/components/base-ui/drawer';
import { FormControl, TextField, InputLabel, Select, MenuItem, Switch, FormControlLabel, Stack, Container, Box, Typography, Slider } from '@mui/material';
import { ChatConfiguration } from './chat.interface';
import { chatConfigContext } from '../chat-section';
import { config } from 'process';
import { text } from 'stream/consumers';
import { set } from 'react-hook-form';

export default function ChatConfig () {
    const [openConfig, setOpenConfig] = React.useState(false);
     
    return (
            <React.Fragment>
                <div className="self-stretch">
                    <label
                        className={cn(
                            buttonVariants({ variant: "secondary", size: "icon" }),
                            "cursor-pointer",
                        )}
                        onClick={() => setOpenConfig(true)}
                    >
                        <SlidersHorizontal className="w-4 h-4"/>
                    </label>  
                </div>
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
                    value={chatConfig.model}
                    label="Model"
                    onChange={(e) => { 
                        // setLocalModel(e.target.value);
                        onChange("model", e.target.value);
                    }}
                    // onBlur={() => handleBlur("model", localModel)}
                >
                    <MenuItem value={"gemini-1.0-pro-001"}>gemini-1.0-pro-001</MenuItem>
                    <MenuItem value={"gemini-pro-vision"}>gemini-pro-vision</MenuItem>
                </Select>
            </FormControl>
        );
    }

    const Grounding = () => {
        // const [localGrounding, setLocalGrounding] = React.useState(chatConfig.grounding);
        return (
            <FormControlLabel 
                control={
                    <Switch
                        checked={chatConfig.grounding}
                        onChange={(e) => { 
                            // setLocalGrounding(e.target.checked);
                            onChange("grounding", e.target.checked);
                        }}
                        // onBlur={() => handleBlur("grounding", localGrounding)}
                    />
                } 
                label="Grounding" 
                id="grounding"
            />
        );
      }

    const Temperature = () => {
        const [localTemperature, setLocalTemperature] = React.useState(chatConfig.temperature);
        const [sliderValue, setSliderValue] = React.useState(localTemperature);
        const [textFieldValue, setTextFieldValue] = React.useState(String(localTemperature));

        const handleTemperatureChange = (event: Event, newValue: number | number[]) => {
                setSliderValue(newValue as number);
                setTextFieldValue(String(newValue));
        };
        const handleTemperatureChangeCommited = (event: any, newValue: number | number[]) => {
                // setSliderValue(newValue as number);
                // setTextFieldValue(newValue as number);
                onChange("temperature", newValue as number);
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
                                onChange("temperature", newValue);
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
        const [localMaxTokens, setLocalMaxTokens] = React.useState(chatConfig.max_tokens);
        return (
            <TextField
                id="maxTokens"
                label=" Max Tokens "
                onChange={(e) => setLocalMaxTokens(Number(e.target.value))}
                onBlur={() => handleBlur("max_tokens", localMaxTokens)}
                value={localMaxTokens}
                autoFocus={false}
            />
        );
    }

    const VertexSearchConfigId = () => {
        const [localVertexSearchConfigId, setLocalVertexSearchConfigId] = React.useState(chatConfig.VERTEX_SEARCH_CONFIG_ID);
        return (
                <TextField
                id="vertexSearchConfigId"
                label=" Vertex Search Config Id "
                onChange={(e) => setLocalVertexSearchConfigId(e.target.value)}
                onBlur={() => handleBlur("VERTEX_SEARCH_CONFIG_ID", localVertexSearchConfigId)}
                value={localVertexSearchConfigId}
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
                            {chatConfig.model === "gemini-1.0-pro-001" && <Grounding />}
                            {chatConfig.grounding && 
                                <>
                                    <DataStoreId />
                                    <DataStoreProjectId />
                                    <DataStoreLocation />
                                </>  
                            }
                            <Temperature />
                            <MaxTokens />
                        </Stack>
                    </FormControl>
                </Box>
                <Box paddingTop={4}>
                    <Box display="flex" justifyContent="center" paddingBottom={2}>
                        <Typography variant="h6" component="h2" gutterBottom align="center">
                            Vertex Search Settings
                        </Typography>
                    </Box>
                    <FormControl>
                        <Stack spacing={2}>
                            <VertexSearchConfigId />
                        </Stack>
                    </FormControl>
                </Box>
            </Container>
        </div>
    )
}


