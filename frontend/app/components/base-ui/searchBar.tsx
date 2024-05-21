import { Search } from 'lucide-react';
import { X } from 'lucide-react';

export type searchBarType = 'chat' | 'search';

export function SearchBar ({inputValue,setInputValue,handleGenerate,type, placeholder} : {inputValue: string, setInputValue: (value: string) => void, handleGenerate: (e: React.FormEvent) => void, type: string, placeholder: string}) {
    
    return (
            <div className='w-full p-6'>
                <div className="w-full border-2 p-4 flex flex-wrap rounded-full shadow-lg">
                    <div className="w-full flex flex-row items-center justify-center gap-2">
                        {type == 'search' && <Search color="lightgrey"/>}
                        <textarea
                            className="flex-grow text-black"
                            style={{outline: 'none', resize: 'none', backgroundColor: 'transparent'}}
                            placeholder={placeholder}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    handleGenerate(e);
                                    setInputValue("");
                                }
                            }}
                            rows={inputValue.split('\n').length}
                        />
                        {inputValue && <X color="lightgrey" onClick={() => setInputValue("")} />}
                    </div>
                </div>
            </div>
    );
}
