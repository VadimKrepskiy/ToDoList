import {useSelector} from 'react-redux'
import {RootState} from '@/app'

export const useAppSelector = useSelector.withTypes<RootState>()