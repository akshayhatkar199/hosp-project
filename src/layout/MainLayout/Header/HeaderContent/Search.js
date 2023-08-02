// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';

// assets
import { SearchOutlined } from '@ant-design/icons';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = () => (
    <Box sx={{ width: '100%', ml: { xs: 1, md: 1 } }}>
        {/* <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
            <OutlinedInput
                size="small"
                id="header-search"
                startAdornment={
                    <InputAdornment position="start" sx={{ mr: -0.5 }}>
                        <SearchOutlined />
                    </InputAdornment>
                }
                aria-describedby="header-search-text"
                inputProps={{
                    'aria-label': 'weight'
                }}
                placeholder="Ctrl + K"
            />
        </FormControl> */}
        <h6 className="text-center" style={{ fontFamily: 'Poppins', color: '#f3711c' }}>
            Satyajeet <span style={{ color: '#06833d' }}>Tambe</span>
        </h6>
    </Box>
);

export default Search;
